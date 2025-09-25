# This is a mock notification service. In a real application, you would integrate
# with SMTP for email, Slack/Teams APIs, or webhooks.

def send_alert_notification(alert_details: dict, recipients: list = None):
    """
    Mocks sending an alert notification.
    """
    print(f"--- MOCK NOTIFICATION SENT ---")
    print(f"Alert Type: {alert_details.get('alert_type')}")
    print(f"Severity: {alert_details.get('severity')}")
    print(f"Post ID: {alert_details.get('post_id')}")
    print(f"Content: {alert_details.get('content')[:100]}...")
    print(f"Recipients (mock): {recipients if recipients else 'Default stakeholders'}")
    print(f"------------------------------")

def send_playbook_suggestion(playbook_id: int, trigger_context: dict):
    """
    Mocks sending a playbook suggestion.
    """
    print(f"--- MOCK PLAYBOOK SUGGESTION ---")
    print(f"Playbook ID: {playbook_id}")
    print(f"Trigger Context: {trigger_context}")
    print(f"--------------------------------")