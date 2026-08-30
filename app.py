import os
import streamlit as st
import streamlit.components.v1 as components

st.set_page_config(
    page_title="Rohini & Anurag's Wedding",
    page_icon="💍",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Custom CSS to eliminate padding
st.markdown("""
    <style>
        .block-container {
            padding: 0rem;
        }
        header, footer {
            visibility: hidden;
        }
    </style>
""", unsafe_allow_html=True)

# Path to built React app
BUILD_DIR = os.path.join(os.path.dirname(__file__), "frontend/dist")

if os.path.exists(BUILD_DIR):
    # Declare component pointing directly to build path
    wedding_app = components.declare_component("wedding_app", path=BUILD_DIR)
    wedding_app()
else:
    st.error("Build directory not found. Ensure 'frontend/dist' is built and committed to GitHub.")