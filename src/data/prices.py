import json
import random
import os

os.chdir("react-ts-shopping-cart\src\data") 

def adjust_price(price):
    """
    Adjusts the price by a random percentage between -30% and +30%.
    """
    change_percentage = random.uniform(0.70, 1.30)  # 70% to 130%
    return round(price * change_percentage, 2)

def modify_prices(input_file, output_file):
    """
    Reads a JSON file, modifies the prices, and writes the output to a new file.
    """
    with open(input_file, "r") as file:
        data = json.load(file)
    
    modified_data = {}
    
    for key, value in data.items():
        if key == "FoodName":
            modified_data[key] = value  # Keep headers unchanged
        else:
            new_price = adjust_price(value[1])
            modified_data[key] = [value[0], new_price, value[2], value[3], value[4]]
    
    with open(output_file, "w") as file:
        json.dump(modified_data, file, indent=4)
    
    print(f"Modified grocery data saved to {output_file}")

# Example usage

modify_prices("shoprite.json", "aldi.json")
modify_prices("shoprite.json", "traderjoes.json")
modify_prices("shoprite.json", "stopandshop.json")
modify_prices("shoprite.json", "hmart.json")
