import os
import streamlit as st

st.set_page_config(
    page_title="Rohini & Anurag's Wedding",
    page_icon="💍",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Custom styling to strip padding and fill screen
st.markdown("""
    <style>
        .block-container {
            padding: 0rem !important;
            margin: 0rem !important;
        }
        header, footer, #MainMenu {
            visibility: hidden;
        }
    </style>
""", unsafe_allow_html=True)

# Build file path
INDEX_PATH = os.path.join(os.path.dirname(__file__), "frontend", "dist", "index.html")

if os.path.exists(INDEX_PATH):
    with open(INDEX_PATH, 'r', encoding='utf-8') as f:
        html_data = f.read()
    
    st.html(html_data)
else:
    st.error("Build directory not found. Please ensure 'frontend/dist/index.html' is committed.")