from flask import Flask, render_template, jsonify
import os
from flask_cors import CORS

# Blueprints
from routes.auth import auth_bp  
from routes.announcements import announcements_bp
from routes.pending import pending_bp
from routes.images import images_bp
from routes.faculty import faculty_bp
from routes.labs import labs_bp
from routes.downloads import downloads_bp
from routes.fees import fees_bp
app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024  # 100 MB max upload
CORS(app)

# Register Blueprints
app.register_blueprint(announcements_bp, url_prefix='/api')
app.register_blueprint(auth_bp, url_prefix='/api')
app.register_blueprint(pending_bp, url_prefix='/api')
app.register_blueprint(images_bp, url_prefix='/api')
app.register_blueprint(faculty_bp, url_prefix='/api')
app.register_blueprint(labs_bp, url_prefix='/api')
app.register_blueprint(downloads_bp, url_prefix='/api')
app.register_blueprint(fees_bp, url_prefix='/api')
# Routes
@app.route('/')
@app.route('/home')
def home():
    return render_template('base.html')

@app.route('/login')
def login_page():
    return render_template('login.html')

@app.route('/dashboard')
def dashboard_page():
    return render_template('dashboard.html')

@app.route('/maintenance')
def maintenance_page():
    return render_template('maintenance_dashboard.html')

@app.route('/about')
def about():
    return render_template('About Institute.html')

@app.route('/admission')
def admission():
    return render_template('Addmission/ADDMISSION.html')

@app.route('/first-year-admission')
def first_year_admission():
    return render_template('Addmission/first_year_admission.html')

@app.route('/direct-second-year-admission')
def direct_second_year_admission():
    return render_template('Addmission/direct_second_year_admission.html')

@app.route('/higher-classes-admission')
def higher_classes_admission():
    return render_template('Addmission/higher_classes_admission.html')

@app.route('/exam-cell')
def exam_cell():
    return render_template('Exam-Cell/E-cell.html')

@app.route('/facility')
def facility():
    return render_template('FACILITIES/Facility.html')

@app.route('/departments')
def departments():
    return render_template('college_dept/departments.html')

@app.route('/dept/<name>')
def department(name):
    return render_template(f'college_dept/departments/{name}.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/contactus')
def contactus():
    return render_template('contactus.html')

@app.route('/downloads')
def downloads():
    return render_template('downloads.html')

@app.route('/student-section')
def student_section():
    return render_template('student_section.html')

@app.route('/tposection')
def tposection():
    return render_template('tposection.html')

@app.route('/search')
def search():
    return render_template('search_results.html')

@app.route('/policy')
def policy():
    return render_template('policy.html')

@app.route('/privacy')
def privacy():
    return render_template('privacy.html')

@app.route('/privacy-payment')
def privacy_payment():
    return render_template('privacy-payment.html')

@app.route('/terms')
def terms():
    return render_template('terms.html')

@app.route('/web-policy')
def web_policy():
    return render_template('web-policy.html')

@app.route('/copyright')
def copyright():
    return render_template('copyright.html')

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.errorhandler(413)
def request_entity_too_large(e):
    return jsonify({'error': 'File too large. Maximum upload size is 100MB.'}), 413


if __name__ == '__main__':
    app.run(debug=True, port=5000)
