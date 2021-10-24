from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/applyModification', methods=['POST'])
def applyModification():
    # amount = request.form['amount']
    body = request.get_json(force=True)
    origianlUrl = body['origianlUrl']
    modificatorUrl = body['modificatorUrl']

    resultUrl = process_files(origianlUrl, modificatorUrl)
    return resultUrl

def process_files(origianlUrl, modificatorUrl):
# save files to file

# launch ml
    
# read file

# save to ipfs

    return "newUrl"

    
if __name__ == "__main__":
    app.run()

