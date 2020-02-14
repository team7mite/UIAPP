import { Component, OnInit, ɵConsole } from '@angular/core';
import { AnalyticsService } from '../analytics.service';
import { AuthService } from 'src/app/auth/auth.service';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { ChartSelectEvent } from 'ng2-google-charts';


@Component({
  selector: 'app-statement1',
  templateUrl: './statement1.component.html',
  styleUrls: ['./statement1.component.css']
})
export class Statement1Component implements OnInit {
  academicYears: string[] = [];
  course;
  present;
  termnumbers: [] = [];
  attendance_details = [];
  public firstLevelChart: GoogleChartInterface;
  title: string;
  error_message: string
  error_flag = false
  chart_visibility = false;
  terms;
  selectedyear;
  year;
  termNumber;
  user_info;
  showSpinner = false;
  ia_details;
  display = false;
  testtt = false;
  subname = '';
  dummy = [];
  barData = [];
  cname: any = "";
  maxMarks: any = "";
  obtainedMarks: any = "";
  iaNumber;
  courseCode;
  tableChart: GoogleChartInterface;
  section;
  coursename;
  deptId;
  UE;
  total;
  roles;
  selectedDepatment;
  allFaculties;
  courseAttendance: any[] = [];
  set_role: any = "STUDENT";
  dept
  departments;
  department;
  facuties
  alldepartments: [] = [];
  faculties: any;
  eid: string[] = [];
  search;
  userRole: string[] = [];
  userR;
  empId;
  columnChart: { chartType: string; dataTable: any; options: { title: string; width: number; height: number; }; };
  dept_names: any;
  resul: String[] = []
  deptName: any;
  current_faculty: any;
  fac_chart_visibility = false;
  facultyChart: GoogleChartInterface;
  totalClass: any;
  // public firstLevelChart: GoogleChartInterface;
  constructor(private analyticsService: AnalyticsService, private authService: AuthService) { }

  ngOnInit() {
    // this.getAptRole()
    this.search = "false"
    this.user_info = this.authService.getUserInfo()
    console.log(this.user_info)
    let arr = this.user_info["roles"];
    console.log(this.user_info)
    if (this.user_info["roles"] == "STUDENT") {
      this.userRole.push("STUDENT");
      this.userR = "STUDENT"
      this.get_academic_years();
      this.get_term_numbers();
      // this.get_dept();
    }
    else if (arr[0] == "FACULTY" && arr[2] == "PRINCIPAL") {
      this.analyticsService.get_depts().subscribe(res => {
        this.departments = res["depts"]
        console.log(res["depts"])
      })
      this.userRole.push("PRINCIPAL");
      this.userR = "PRINCIPAL"
      this.get_academic_years();
      this.get_term_numbers();
    }
    else if (arr[2] == "HOD") {
      this.userRole.push("HOD");
      this.userR = "HOD"
      this.get_academic_years();
      this.get_term_numbers();
      this.empId = this.user_info["employeeGivenId"]
      // employeeGivenId
    }
    else if (arr[0] == "FACULTY") {
      this.userRole.push("FACULTY");
      this.userR = "FACULTY"
      this.get_academic_years();
      this.get_term_numbers();
    }


  }
  // getAptRole(){
  //   for (let r of this.roles) {
  //     if (r == "PRINCIPAL") {
  //       this.set_role = r;
  //       break;
  //     }
  //     else if (r == "HOD") {
  //       this.set_role = r;
  //     }
  //     else if (r == "FACULTY") {
  //       this.set_role = r;
  //     }
  //   }
  //   console.log(this.set_role);
  // }

  get_academic_years() {
    this.analyticsService.get_academic_years().subscribe(res => {
      this.academicYears = res['acdemicYear']
    })
  }

  get_term_numbers() {
    this.analyticsService.get_term_details().subscribe(res => {
      this.termnumbers = res['term_numbers']
    }
    )
  }
  get_all_departments() {
    this.analyticsService.get_all_department().subscribe(res => {
      this.alldepartments = res['department']
      console.log(this.alldepartments)
    }
    )
  }
  get_student_total_attendance() {
    this.analyticsService.getCourseAttendance(this.course, this.user_info['usn']).subscribe(res => {
      this.courseAttendance = res["res"]
      console.log(this.courseAttendance)
    })
  }



  searchbutton() {
    this.showSpinner = true;
    this.analyticsService.get_attendance_details(this.user_info['usn'], this.selectedyear, this.terms).subscribe(res => {
      this.attendance_details = res['attendance_percent']
      this.attendace_data(this.attendance_details)
    })
  }
  attendace_data(data) {
    this.dummy = data;

    let dataTable = [];
    dataTable.push([
      "CourseName",
      "IA %", { type: 'string', role: 'tooltip' },
      "Attendance %", { type: 'string', role: 'tooltip' }
    ]);
    for (let i = 0; i < data.length; i += 1) {
      dataTable.push([data[i]['courseName'],
      data[i]['avg_ia_score'], "IA % : " + data[i]['avg_ia_score'] + "\n" +
      "Attendance % : " + data[i]['attendance_per'], data[i]['attendance_per'], "IA % : " + data[i]['avg_ia_score'] + "\n" +
      "Attendance % : " + data[i]['attendance_per']])
    }
    if (dataTable.length > 1) {
      this.chart_visibility = true
      this.error_flag = false
      this.graph_data(dataTable)
    }
    else {
      this.error_flag = true
      this.error_message = "Data doesnot exist for the entered criteria"
    }
  }

  back_() {
    this.chart_visibility = false
  }


  graph_data(data) {
    this.showSpinner = false
    this.title = 'Course-wise Attendance %',
      this.firstLevelChart = {
        chartType: "ComboChart",
        dataTable: data,
        options: {
          bar: { groupWidth: "20%" },
          vAxis: {
            title: "Percentage",
          },

          height: 800,
          hAxis: {
            title: "Courses",
            titleTextStyle: {
            }
          },
          chartArea: {
            left: 80,
            right: 100,
            top: 100,
          },
          legend: {
            position: "top",
            alignment: "end"
          },
          seriesType: "bars",
          colors: ["Red", "Yellow"],
          fontName: "Times New Roman",
          fontSize: 19,

        }

      }
  }

  second_level(event: ChartSelectEvent) {
    console.log("student",event)
    this.barData = [];
    let arr = event.selectedRowFormattedValues;
    this.subname = arr[0];

    this.course = event.selectedRowFormattedValues[0]

    this.get_student_total_attendance()

    setTimeout(() => {
      console.log(this.courseAttendance)
      this.present = this.courseAttendance["present"]
      this.total = this.courseAttendance["total"]
    }, 2000)



    for (let i = 0; i < this.dummy.length; i += 1) {

      if (this.subname == this.dummy[i]["courseName"]) {
        this.coursename = this.dummy[i]["courseName"]
        for (let j = 0; j < this.dummy[i]["ia_attendance_%"].length; j = j + 1) {
          this.barData.push(this.dummy[i]["ia_attendance_%"][j]);
        }
        function GetSortOrder(prop) {
          return function (a, b) {
            if (a[prop] > b[prop]) {
              return 1;
            } else if (a[prop] < b[prop]) {
              return -1;
            }
            return 0;
          }
        }
        this.barData.sort(GetSortOrder("iaNumber"))


        // for(let i=0;i<this.barData.length;i++){
        // console.log(this.barData[i])
        // }
      }
    }

  }

  onSearch(event) {
    if (this.userRole.includes("FACULTY")) {
      this.get_faculty_stud_ia(this.user_info['employeeGivenId'])
      
    }

    else {
      this.get_facul_details()
      //see the department and get emps
      
      //console.log(this.faculties)
    }
  }

  get_facul_details(){
    if (this.userR == "FACULTY" ||this.userR == "HOD") {
    let str = this.empId;
      let patt = new RegExp("[a-zA-Z]*");
      let res = patt.exec(str);
      this.deptName = res[0];
    }else
      {
        this.deptName = this.selectedDepatment;
      }
      this.analyticsService.get_dept_faculties(this.deptName).subscribe(res => {
        this.resul = res["faculties"]
      })
  }

  get_faculty_stud_ia(facultyId) {
    this.getFacultyDetails(facultyId);
  }

  get_faculty_details() {
    if (this.userR == "FACULTY" || this.userR == "HOD") {
      let arr = this.user_info['employeeGivenId'];
      let patt = new RegExp("[a-zA-z]*");
      let res = patt.exec(arr);
      this.deptName = res[0];
    }
    else {
      this.deptName = this.selectedDepatment;
    }
    this.analyticsService.get_dept_faculties(this.deptName).subscribe(res => {
      this.resul = res['res'];
    })
  }

  getFacultyDetails(fac_id) {

    this.current_faculty = fac_id
    let subs;
    let data = [["Subject Name", "IA score","Attendance"]]
    this.analyticsService.get_emp_subjects(this.current_faculty, this.selectedyear, this.terms).subscribe(res => {
      subs = res["iamarks"]
      console.log(subs)
    },
      err => { },
      () => {
        for (let s of subs) {
          console.log(s)
          data.push([s['courseName'], s['iaPercentage'],s['attendence']])
        }
        if (data.length > 1) {

          this.graph_data1(data)
          this.error_flag = false
        }
        else {
          this.showSpinner = false
          this.error_flag = true;
          this.error_message = "Data doesnot exist for the entered criteria"
        }
      })
  }
  faculty_level(event: ChartSelectEvent){
    console.log("faculty",event)

  }
graph_data1(data) {
    console.log(data)
    this.showSpinner = false
    this.chart_visibility = true
    this.title = 'Course-wise Internal Marks %',
      this.facultyChart = {
        chartType: "ComboChart",
        dataTable: data,
        options: {
          focusTarget: 'datum',
          bar: { groupWidth: "20%" },
          vAxis: {
            title: "Percentage",
            scaleType: 'linear',
            maxValue: '100',
            minValue: '0'
          },

          height: 600,
          hAxis: {
            title: "Courses",
            titleTextStyle: {
            }
          },
          chartArea: {
            left: 80,
            right: 100,
            top: 100,
          },
          legend: {
            position: "top",
            alignment: "end"
          },
          seriesType: "bars",
          colors: ["#000000", "#000080"],
          fontName: "Times New Roman",
          fontSize: 13,
        }

      }
  }
}

