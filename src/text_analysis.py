import pandas as pd
import re

def analyze_ingredients(text, health_conditions):
    harmful_data = pd.read_csv('data/harmful_ingredients.csv')

    warnings = []
    potential_harm_warnings = []

    # Check for specific health condition ingredients
    for condition in health_conditions:
        harmful_ingredients = harmful_data[harmful_data['harmful_for'] == condition]['ingredient'].tolist()
        for ingredient in harmful_ingredients:
            if ingredient.lower() in text.lower():
                warnings.append(ingredient)

    # Additional checks for sodium, cholesterol, and fats with thresholds
    sodium_match = re.search(r'sodium\s*(\d+)\s*mg', text, re.IGNORECASE)
    cholesterol_match = re.search(r'cholesterol\s*(\d+)\s*mg', text, re.IGNORECASE)

    if sodium_match:
        sodium_content = int(sodium_match.group(1))
        if sodium_content > 800:
            warnings.append('sodium')

    if cholesterol_match:
        cholesterol_content = int(cholesterol_match.group(1))
        if cholesterol_content > 80:
            warnings.append('cholesterol')

    # Consider 'fats' harmful if sodium or cholesterol is high
    if 'sodium' in warnings or 'cholesterol' in warnings:
        if 'fat' in text.lower() or 'fats' in text.lower():
            warnings.append('fats')

    # Check for general harmful ingredients (harmful for all)
    general_harmful_ingredients = harmful_data[harmful_data['harmful_for'] == 'all']['ingredient'].tolist()
    for ingredient in general_harmful_ingredients:
        if ingredient.lower() in text.lower():
            potential_harm_warnings.append(ingredient)

    # Remove duplicates from warnings and potential_harm_warnings
    warnings = list(set(warnings))
    potential_harm_warnings = list(set(potential_harm_warnings))

    # Return the result, the list of warnings, and the list of potential harmful ingredients
    if warnings or potential_harm_warnings:
        return "No", warnings, potential_harm_warnings
    else:
        return "Yes", [], []
