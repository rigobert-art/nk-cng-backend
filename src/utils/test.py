import africastalking

# Initialize the SDK
username = "8ee049d80e558be1680fddf90fd4683e016d9ef98be04fbbc6e2e6f41f869cee"    # Use 'sandbox' for testing in the sandbox environment
api_key = "MIKE001"      # Use your sandbox API key for testing in the sandbox environment

africastalking.initialize(username, api_key)

# Initialize the SMS service
sms = africastalking.SMS

# Define the recipients and message
recipients = ["+254712345678"]  # Replace with your phone number
message = "Hello! This is a test message from Africa's Talking API."

# Send the message
def send_bulk_sms():
    try:
        response = sms.send(message, recipients)
        print(response)
    except Exception as e:
        print(f"Encountered an error while sending: {e}")

# Call the function to send the message
send_bulk_sms()