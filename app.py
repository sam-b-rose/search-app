# import the Flask class from the flask module
from flask import Flask, render_template

# create the application object
app = Flask(
    __name__,
    static_url_path='',
    static_folder='static/dist',
    template_folder='templates'
)

# use decorators to link the function to a url
@app.route('/')
def home():
    return render_template('index.html')

# start the server with the 'run()' method
if __name__ == '__main__':
    app.run(debug=True)
