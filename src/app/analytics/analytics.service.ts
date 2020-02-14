import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  
 
  baseurl = environment.baseUrl;
  constructor(private http: HttpClient) { }


  get_academic_years(): Observable<any> {
    let url = `${this.baseurl}academicyear`;
    return this.http.get(url);
  }

  get_term_details(): Observable<any> {
    let url = `${this.baseurl}termNumber`;
    return this.http.get(url)

  }
 
  // getUsnByEmail(email):Observable<any>{
  //   let url = `${this.baseurl}getUsn/${email}`   
  //   return this.http.get(url)
  //  }
  get_attendance_details(usn:string,year:any,terms:any):Observable<any>{
    let url = `${this.baseurl}attendancedetails/${usn}/${year}/${terms}`
    return this.http.get(url)
  }
  get_ia_detail(usn, courseCode, section, termNumber, deptId, year) {
    let url=`${this.baseurl}iadetails/${usn}/${courseCode}/${section}/${termNumber}/${deptId}/${year}`
    return this.http.get(url)
  
  }
  getCourseAttendance(course,usn):Observable<any>{
    let url = `${this.baseurl}getCourseAttendance/${course}/${usn}`   
    return this.http.get(url)
   }
   get_faculties(dept):Observable<any>{
    let url = `${this.baseurl}faculties/${dept}`   
    return this.http.get(url)
   }

  get_all_department():Observable<any>
  {
    let url = `${this.baseurl}alldepartment`   
    return this.http.get(url)
  }
 
  get_dept_faculties(dept): Observable<any>{
    let ur = `${this.baseurl}emps/${dept}`
    return this.http.get(ur)
  }
  
    
  
  
   get_fac_sub_avg_attendance(eid,year):Observable<any>{
    let url= `${this.baseurl}facsubattendance/${eid}/${year}`   
    return this.http.get(url)
   }

   get_selected_faculty_details(empid,term):Observable<any>{
    let ur = `${this.baseurl}get-selected-fac-details/${empid}/${term}`;
    return this.http.get(ur);
  }

  get_emp_subjects(empid,term,sem): Observable<any>{
    let ur = `${this.baseurl}emp/ia/total/${empid}/${term}/${sem}`
    return this.http.get(ur)
  }
  
  get_depts(): Observable<any>{
    let uri = `${this.baseurl}depts`
    return this.http.get(uri)
  }
  }

