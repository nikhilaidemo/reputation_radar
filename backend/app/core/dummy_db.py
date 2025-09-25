from datetime import datetime, timedelta

# In-memory dummy data for demonstration purposes
# This data will reset every time the server restarts.

users_db = [
    {"id": 1, "email": "pr_manager@example.com", "password_hash": "password", "role": "pr_manager", "created_at": datetime.now()},
    {"id": 2, "email": "social_analyst@example.com", "password_hash": "password", "role": "social_media_analyst", "created_at": datetime.now()},
    {"id": 3, "email": "executive@example.com", "password_hash": "password", "role": "executive", "created_at": datetime.now()},
    {"id": 4, "email": "admin@example.com", "password_hash": "password", "role": "admin", "created_at": datetime.now()},
]

sources_db = [
    {"id": 1, "type": "Twitter/X", "name": "TwitterBrandX", "api_config": {"consumer_key": "xxx"}, "is_active": True},
    {"id": 2, "type": "Reddit", "name": "RedditBrandY", "api_config": {"client_id": "yyy"}, "is_active": True},
    {"id": 3, "type": "Review Site", "name": "TrustPilotBrandZ", "api_config": {"url": "zzz"}, "is_active": False},
]

posts_db = [
    {
        "id": 1,
        "source_id": 1,
        "content": "Our new product is absolutely fantastic! Highly recommend it.",
        "author": "UserA",
        "url": "http://twitter.com/usera/1",
        "timestamp": datetime.now() - timedelta(hours=3),
        "sentiment_score": 0.9,
        "sentiment_label": "positive",
        "topic": "Product Launch"
    },
    {
        "id": 2,
        "source_id": 1,
        "content": "Terrible customer service experience with BrandX today. Very disappointed.",
        "author": "UserB",
        "url": "http://twitter.com/userb/2",
        "timestamp": datetime.now() - timedelta(hours=2),
        "sentiment_score": -0.8,
        "sentiment_label": "negative",
        "topic": "Customer Service"
    },
    {
        "id": 3,
        "source_id": 2,
        "content": "Just got my order from BrandX and it's okay, nothing special.",
        "author": "RedditorC",
        "url": "http://reddit.com/redditorc/3",
        "timestamp": datetime.now() - timedelta(hours=1),
        "sentiment_score": 0.1,
        "sentiment_label": "neutral",
        "topic": "Product Experience"
    },
    {
        "id": 4,
        "source_id": 1,
        "content": "Love the latest update from BrandX! Keep up the good work.",
        "author": "UserD",
        "url": "http://twitter.com/userd/4",
        "timestamp": datetime.now() - timedelta(minutes=30),
        "sentiment_score": 0.85,
        "sentiment_label": "positive",
        "topic": "Software Update"
    },
    {
        "id": 5,
        "source_id": 2,
        "content": "Why is BrandX so bad at fixing bugs? This is getting ridiculous.",
        "author": "RedditorE",
        "url": "http://reddit.com/redditoe/5",
        "timestamp": datetime.now() - timedelta(minutes=10),
        "sentiment_score": -0.95,
        "sentiment_label": "negative",
        "topic": "Bug Report"
    }
]

alerts_db = [
    {
        "id": 1,
        "post_id": 2,
        "alert_type": "Negative Sentiment Spike",
        "severity": "High",
        "created_at": datetime.now() - timedelta(hours=1, minutes=50),
        "resolved": False
    },
    {
        "id": 2,
        "post_id": 5,
        "alert_type": "Negative Sentiment Spike",
        "severity": "Critical",
        "created_at": datetime.now() - timedelta(minutes=5),
        "resolved": False
    },
    {
        "id": 3,
        "post_id": 1,
        "alert_type": "Positive Sentiment Spike",
        "severity": "Low",
        "created_at": datetime.now() - timedelta(hours=2, minutes=30),
        "resolved": True
    }
]

playbooks_db = [
    {
        "id": 1,
        "trigger_type": "Negative Sentiment - Customer Service",
        "sentiment_threshold": -0.7,
        "template_text": "We apologize for your experience. Please DM us with details so we can assist.",
        "last_used": None
    },
    {
        "id": 2,
        "trigger_type": "Positive Sentiment - Product Launch",
        "sentiment_threshold": 0.7,
        "template_text": "Thank you for the wonderful feedback! We're thrilled you love our new product.",
        "last_used": None
    },
    {
        "id": 3,
        "trigger_type": "Critical Bug Report",
        "sentiment_threshold": -0.9,
        "template_text": "We are aware of this issue and our team is actively working on a fix. Thank you for your patience.",
        "last_used": None
    }
]

audit_log_db = [] # Not used in API endpoints yet, but available for future