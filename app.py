import os
import streamlit as st
import streamlit.components.v1 as components

st.set_page_config(
    page_title="Rohini & Anurag's Wedding",
    page_icon="💍",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Hide Streamlit UI elements and remove margins
st.markdown("""
    <style>
        .block-container {
            padding: 0rem !important;
            margin: 0rem !important;
        }
        iframe {
            width: 100% !important;
            border: none !important;
        }
        header, footer, #MainMenu {
            visibility: hidden;
        }
    </style>
""", unsafe_allow_html=True)

# Path to the built index.html
INDEX_PATH = os.path.join(os.path.dirname(__file__), "frontend", "dist", "index.html")

if os.path.exists(INDEX_PATH):
    with open(INDEX_PATH, 'r', encoding='utf-8') as f:
        html_data = f.read()
    
    # Render HTML directly with a set viewport height
    components.html(html_data, height=2200, scrolling=True)
else:
    st.error("Build file 'frontend/dist/index.html' not found. Please ensure your React build is committed.")