# This is a mock NLP service. In a real application, you would integrate
# with libraries like transformers, spaCy, or call an external NLP API.

from typing import Tuple

def analyze_sentiment(text: str) -> Tuple[float, str]:
    """
    Mocks sentiment analysis.
    Returns a dummy sentiment score and label.
    """
    text_lower = text.lower()
    if "good" in text_lower or "fantastic" in text_lower or "love" in text_lower:
        return 0.8, "positive"
    elif "bad" in text_lower or "terrible" in text_lower or "disappointed" in text_lower or "ridiculous" in text_lower:
        return -0.7, "negative"
    else:
        return 0.1, "neutral"

def extract_topics(text: str) -> str:
    """
    Mocks topic extraction.
    Returns a dummy topic.
    """
    text_lower = text.lower()
    if "product" in text_lower or "launch" in text_lower:
        return "Product"
    elif "customer service" in text_lower or "support" in text_lower:
        return "Customer Service"
    elif "bug" in text_lower or "issue" in text_lower:
        return "Technical Issue"
    return "General"