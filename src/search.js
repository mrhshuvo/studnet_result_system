const search_student_data = document.getElementById("search_student_data");
const student_mark_sheet_show = document.querySelector(".student_mark_sheet_show");
const loader = document.querySelector("img");



search_student_data.onsubmit = (e) => {

    e.preventDefault();

    const form_data = new FormData(e.target);
    const data = Object.fromEntries(form_data.entries());

   loader.style.display = "block";

    setTimeout(function() {
            loader.style.display = "none";
      const studentData = getDataLs("students");

   const finalData = studentData.find((item) => item.roll === data.roll && item.reg === data.reg);

    let content;

    if(finalData){
   
   content = `
   
   <div class="row justify-content-center ">
   <div class="col-md-10 mb-3">
       <div class="card shadow">
           <div class="card-body  " >
           <div class="student-info">
     <img
     src="${finalData.photo}" alt="">
     <h3>${finalData.name}</h3>
    
     <label style="font-size:20px; font-weight:bold;">Roll N:${finalData.roll}</label><br>

     <label style="font-size:20px; font-weight:bold;"> Registration N: ${finalData.reg}</label>
     
     <h2>${
      getFinalResult({
        bangla: finalData.result.bangla,
        english: finalData.result.english,
        math: finalData.result.math,
        science: finalData.result.science,
        social_science: finalData.result.social_science,
        religion: finalData.result.religion,
      }).result == "F" 
      ? `<h1 style="color:red;">Failed</h1>` : `<h1 style="color:maroon;">Passed</h1>`}</h2>

     <table class="table table-bordered table-striped">
        <thead class="text-center table-danger">
         <tr>
           <th>Serial No</th>
           <th>Subject</th>
           <th>Mark</th>
           <th>Grade</th>
           <th>GPA</th>
           <th>CGPA</th>
           <th>Final Result</th>
         </tr>
        </thead>
        <tbody class="table-success " style="font-weight: ;">
         <tr class="table-light align-middle text-center">
           <td>1</td>
           <td>Bangla</td>
           <td>${finalData.result.bangla}</td>
           <td>${getGpaGrade(finalData.result.bangla).grade}</td>
           <td>${getGpaGrade(finalData.result.bangla).gpa}</td>
           
           <td rowspan="6">${
            getFinalResult({
              bangla: finalData.result.bangla,
              english: finalData.result.english,
              math: finalData.result.math,
              science: finalData.result.science,
              social_science: finalData.result.social_science,
              religion: finalData.result.religion,
            }).cgpa.toFixed(2)}</td>

           <td rowspan="6">${
            getFinalResult({
              bangla: finalData.result.bangla,
              english: finalData.result.english,
              math: finalData.result.math,
              science: finalData.result.science,
              social_science: finalData.result.social_science,
              religion: finalData.result.religion,
            }).result}</td>
         </tr>
         <tr class="text-center">
           <td>2</td>
           <td>English</td>
           <td>${finalData.result.english}</td>
           <td>${getGpaGrade(finalData.result.english).grade}</td>
           <td>${getGpaGrade(finalData.result.english).gpa}</td>
         </tr>
         <tr class="table-light text-center">
           <td>3</td>
           <td>Math</td>
           <td>${finalData.result.math}</td>
           <td>${getGpaGrade(finalData.result.math).grade}</td>
           <td>${getGpaGrade(finalData.result.math).gpa}</td>
         </tr>
         <tr class="text-center">
           <td>4</td>
           <td>Science</td>
           <td>${finalData.result.science}</td>
           <td>${getGpaGrade(finalData.result.science).grade}</td>
           <td>${getGpaGrade(finalData.result.science).gpa}</td>
         </tr>
         <tr class="table-light text-center">
           <td>5</td>
           <td>Social Science</td>
           <td>${finalData.result.social_science}</td>
           <td>${getGpaGrade(finalData.result.social_science).grade}</td>
           <td>${getGpaGrade(finalData.result.social_science).gpa}</td>
         </tr>
         <tr class="text-center">
           <td>6</td>
           <td>Religion</td>
           <td>${finalData.result.religion}</td>
           <td>${getGpaGrade(finalData.result.religion).grade}</td>
           <td>${getGpaGrade(finalData.result.religion).gpa}</td>
         </tr>
        </tbody>
     </table>
   </div>
           </div>
       </div>
   </div>
</div>

   `

    }else{

   content = "<b style='font-size:25px; font-family:cursive;'>No Data Found</b>";

    };
    student_mark_sheet_show.innerHTML = content;
  
  },3000);
    
    

    
}