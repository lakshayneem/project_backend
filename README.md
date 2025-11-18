# Future_Builders  
### Wellness & Preventive Care Portal

This project is a simple healthcare appointment and wellness management system designed for the **HCLTech Hackathon**.  
The platform includes **three roles**: **Patient (User)**, **Doctor**, and **Admin**.  
Below is the complete workflow documentation — simple, clear, and without code.

---

## 🔷 A. Patient (User) Workflow

### 1. Registration & Login
- Patient registers using email and password.
- Role is automatically assigned as **patient**.
- After login, patient receives access to their dashboard.

### 2. Patient Dashboard
Dashboard shows:
- Daily wellness metrics (water, steps, sleep)  
- Preventive health reminders  
- Latest doctor notes  
- Upcoming appointments  
- Past appointment summary  

### 3. Book Appointment
Patient can search based on:
- Speciality (Cardiology, Orthopedics, etc.)  
- Doctor name
- Check Availability
- Date + Time slot  
Search results show specialties → doctors → available slots.

Appointment is created with:  
**status = pending**


### 4. View Appointment Notes
After the appointment is completed:
- Doctor writes notes or prescription  
- Patient can view notes inside appointment details  

---

## 🔷 B. Doctor Workflow

### 1. Login
- Doctor account is created only by Admin.
- Doctor logs in using Admin-provided credentials.
- Role = **doctor**

### 2. Doctor Dashboard
Doctor sees:
- Past completed appointments  
- Today’s accepted appointments  
- Future appointment requests (pending)

### 3. Accept / Reject Appointments
- Accepts → status = **accepted**
- Rejects → status = **rejected**
  - Reason auto: *"Not available by doctor"*

### 4. Set Availability / Unavailability
Doctor can:
- Mark unavailable days/times  
- Patients cannot book during unavailable slots  

### 5. Add Notes / Prescription
For today’s accepted appointments:
- Doctor writes prescription/notes  
- Marks appointment as **completed**  
- Notes become visible to patient  

---

## 🔷 C. Admin Workflow

Admin can:
- Create doctor accounts  
- Assign login credentials  
- Delete doctors  
- Delete patients  
- View doctor & patient list  

**Note:**  
Admin does not book appointments or write prescriptions.  

---

## 🔷 D. Appointment Status Flow

| Step | Status |
|------|--------|
| When patient books | **pending** |
| When doctor accepts | **accepted** |
| When doctor rejects | **rejected** |
| When patient cancels | **cancelled** |
| When doctor adds notes and completes | **completed** |

---

## 🔷 E. System Flow Summary

### Patient Flow:
Search doctor → Select speciality → Check slots → Book appointment →  
Wait for acceptance → Attend appointment → View notes

### Doctor Flow:
Login → Check pending requests → Accept/Reject →  
See today’s accepted appointments → Add notes/prescription

### Admin Flow:
Create doctors → Provide credentials → Manage doctor/patient accounts


