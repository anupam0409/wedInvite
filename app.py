import os
import streamlit as st
import streamlit.components.v1 as components

# Set full-width layout for the invitation page
st.set_page_config(
    page_title="Rohini & Anurag's Wedding",
    page_icon="💍",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Custom CSS to eliminate default Streamlit padding/margins
st.markdown("""
    <style>
        .block-container {
            padding-top: 0rem;
            padding-bottom: 0rem;
            padding-left: 0rem;
            padding-right: 0rem;
        }
        header {visibility: hidden;}
        footer {visibility: hidden;}
    </style>
""", unsafe_allow_html=True)

# Path to the React production build
# Use 'frontend/build' if using Create React App
BUILD_DIR = os.path.join(os.path.dirname(__file__), "frontend/dist")

if not os.path.exists(BUILD_DIR):
    st.error("Build directory not found. Please run 'npm run build' inside the frontend folder.")
else:
    # Render the React App
    components.iframe(
        src=None, 
        height=1200, 
        scrolling=True
    )
    # Alternatively, serve local build:
    custom_component = components.declare_component("wedding_app", path=BUILD_DIR)
    custom_component()