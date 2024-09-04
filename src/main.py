from image_processing import extract_text
from text_analysis import analyze_ingredients


def get_user_health_conditions_and_goals():
    health_conditions = []

    # Prompt user for common health conditions
    diabetes = input("Do you have diabetes? (yes/no): ").strip().lower()
    if diabetes == 'yes':
        health_conditions.append('diabetes')

    high_bp = input("Do you have high blood pressure? (yes/no): ").strip().lower()
    if high_bp == 'yes':
        health_conditions.append('high blood pressure')

    # Ask for body weight goals
    weight_goal = input("What is your body weight goal? (maintain/gain/lose): ").strip().lower()

    return health_conditions, weight_goal


def check_calories(text, weight_goal):
    # Extract calories from the text (basic implementation; assumes calories are labeled correctly)
    import re
    calorie_match = re.search(r'calories\s*(\d+)', text, re.IGNORECASE)
    if calorie_match:
        calories = int(calorie_match.group(1))
        if calories > 200:  # 200 calories as the threshold for "high calorie"
            if weight_goal in ['maintain', 'lose']:
                return "High Calorie"
            else:
                return "Low Calorie"
    return None

def print_section(title, content):
    print(f"\n{title}:")
    print("-" * (len(title) + 1)) 
    for item in content:
        print(f"- {item}")
    print() 

if __name__ == "__main__":
    # Get user-specific health conditions and weight goals
    health_conditions, weight_goal = get_user_health_conditions_and_goals()

    image_path = 'data/labels/test.png'       # Food Label Image Path (EDIT THIS)
    
    # Extract text from the food label image
    text = extract_text(image_path)
    
    # Check if the food is high in calories
    calorie_warning = check_calories(text, weight_goal)

    # Analyze the extracted text for harmful ingredients
    result, condition_warnings, potential_harm_warnings = analyze_ingredients(text, health_conditions)
    
    # Map conditions to user-friendly labels
    labeled_warnings = []
    if "sugar" in condition_warnings:
        labeled_warnings.append("Diabetes (sugar)")
    if "salt" in condition_warnings:
        labeled_warnings.append("High Blood Pressure (salt)")
    if calorie_warning:
        labeled_warnings.append(calorie_warning)
    
    print(f"\nRecommendation: {result}")
    print("=" * 18)
    
    if labeled_warnings:
        print_section("Concerns", labeled_warnings)
    
    if potential_harm_warnings:
        print_section("Potentially Harmful/Unhealthy", potential_harm_warnings)
    

