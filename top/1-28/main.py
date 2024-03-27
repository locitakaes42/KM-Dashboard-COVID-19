from flask import Flask, render_template, jsonify
from WordCloud import *

app = Flask(__name__)

@app.route('/')
def main():
    wg = WordCloud('topword.csv', 'news.csv')
    words = wg.generate()
    return render_template('index.html', words=words)

@app.route('/words')
def sample():
    wg = WordCloud('topword.csv', 'news.csv')
    return jsonify(wg.generate())

if __name__ == '__main__':
    app.run(debug=True)