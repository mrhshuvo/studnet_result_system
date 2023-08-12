const Create_new_student_form = document.getElementById("Create_new_student_form");
const alertSmg = document.querySelector(".smg");
const all_student_list = document.querySelector(".all_student_list");
const single_student_data_preview = document.querySelector(".single_student_data_preview");
const edit_student_data_form = document.getElementById("edit_student_data_form");
const Add_student_result_form = document.getElementById("Add_student_result_form");
const edit_student_result_form = document.getElementById("edit_student_result_form");
const add_new_student_close = document.getElementById("add_new_student_close");
const Edit_button = document.getElementById("Edit_button")
// show student Data

const getShowStudentData = () => {

  const oldData = getDataLs("students");

  let content = "";


// validation 
    
    if(oldData.length > 0){
      oldData.map((item,index) => {
        content += ` 
        <tr class="align-middle">
        <td>${index + 1}</td>
        <td><img
            style="width: 60px; height: 60px; border-radius: 50%; object-fit:cover;" 
            src="${item.photo}" 
            alt="${item.name}"></td>
        <td>${item.name}</td>
        <td>${item.roll}</td>
        <td>${item.reg}</td>
        <td> ${item.result === null ? 
          
          `<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Student_result_data" onclick = "addResult('${item.id}')"><label style="font-weight: bold; font-style: italic; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">Add Mark</label></button>`

          :`<button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#Edit_student_result_data" onclick = "editStudentResultData('${item.id}')"><label style="font-weight: bold; font-style: italic; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">View Result</label></button>`}</td>
        <td>
            <button class="btn btn-sm btn-info"><i class="fa-solid fa-eye" data-bs-toggle="modal" data-bs-target="#Student_single_data_view" onclick = "viewSingleStudentData('${item.roll}')"></i></button>
            <button class="btn btn-sm btn-warning" data-bs-toggle="modal" data-bs-target="#Student_edit_data" onclick = "deleteStudentData('${item.id}')" ><i class="fa-solid fa-edit"></i></button>
            <button class="btn btn-sm btn-danger" onclick = "singleStudentDataDelete('${item.roll}')"><i class="fa-solid fa-trash"></i></button>
        </td>
    </tr>`;
      });
    }else{
     content = `<tr>
     <td colspan="7" class="text-center" style="font-weight:bold; font-style:italic; color:maroon; font-family:sans-serif;">No Data found</td>
     </tr>`
    }



  all_student_list.innerHTML = content;
};
getShowStudentData();




//  Student Data Preview

const viewSingleStudentData = (roll) => {

  const allData = getDataLs("students");
  const finalData = allData.find((data) => data.roll === roll);
  
  single_student_data_preview.innerHTML = `
  <img 
  style="border-radius:5%; 
  display:block;
  margin-left:auto;
  margin-right:auto;
  width:50%;
  " 
  src="${finalData.photo}" 
  alt="${finalData.name}">
  <h3 style="color:maroon;">${finalData.name}</h3>
  <p> <b style="font-size:20px;">Roll N</b> : <i style="color:maroon; font-weight:bold;">${finalData.roll}</i></p> 
  <p><b style="font-size:20px;">Reg N</b> : <i style="color:maroon; font-weight:bold;">${finalData.reg}</i></p>`
};




//  Studnet Data edit

const deleteStudentData = (id) => {

  const StudentOldData = getDataLs("students");
  const StudentFinalData = StudentOldData.find((data) => data.id === id);

  edit_student_data_form.querySelector("input[name='name']").value = StudentFinalData.name;
  edit_student_data_form.querySelector("input[name='roll']").value = StudentFinalData.roll;
  edit_student_data_form.querySelector("input[name='reg']").value = StudentFinalData.reg;
  edit_student_data_form.querySelector("input[name='photo']").value = StudentFinalData.photo;
  edit_student_data_form.querySelector("input[name='id']").value = StudentFinalData.id;
  edit_student_data_form.querySelector("img#PreviousImg").setAttribute("src",StudentFinalData.photo);

  setTimeout(() => {
    Edit_button.click();
  },3000);
};



// edit data  save

edit_student_data_form.onsubmit = (e) => {
  e.preventDefault();

  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data.entries());

  

  const oldDataGet = getDataLs("students");

  oldDataGet[oldDataGet.findIndex((item) => item.id === data.id)]={
   ...oldDataGet[oldDataGet.findIndex((item) => item.id === data.id)],
   ...data,
  };

  sendDataLs("students",oldDataGet);

  getShowStudentData();
};



// add result form in id 

const addResult = (id) => {

  Add_student_result_form.querySelector("input[name='id']").value = id;
};


// add student result submit

Add_student_result_form.onsubmit = (e) => {
  e.preventDefault()

  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data.entries())

   const allStudnetData = getDataLs("students");

    allStudnetData[allStudnetData.findIndex((item) => item.id === data.id)] = {
      ...allStudnetData[allStudnetData.findIndex((item) => item.id === data.id)],
      result: data,
    };

    sendDataLs("students",allStudnetData);
    e.target.reset();
    getShowStudentData();
};


// student result data edit

const editStudentResultData = (id) => {

  const allStudentOldData = getDataLs("students");

  const finalStudentData = allStudentOldData.find((item) => item.id === id);

  edit_student_result_form.querySelector("input[name='bangla']").value = finalStudentData.result.bangla;
  edit_student_result_form.querySelector("input[name='english']").value = finalStudentData.result.english;
  edit_student_result_form.querySelector("input[name='math']").value = finalStudentData.result.math;
  edit_student_result_form.querySelector("input[name='social_science']").value = finalStudentData.result.social_science;
  edit_student_result_form.querySelector("input[name='science']").value = finalStudentData.result.science;
  edit_student_result_form.querySelector("input[name='religion']").value = finalStudentData.result.religion;
  edit_student_result_form.querySelector("input[name='id']").value = finalStudentData.result.id;

  

};


// student result data save and update

edit_student_result_form.onsubmit = (e) => {
  e.preventDefault();

  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data.entries());

  const getOldStudentData = getDataLs("students");

  getOldStudentData[getOldStudentData.findIndex((item) => item.id === data.id)] = {
    ...getOldStudentData[getOldStudentData.findIndex((item) => item.id === data.id)],
    result: data,
  };

  sendDataLs("students",getOldStudentData);
   getShowStudentData();
};


// Student single data delete

const singleStudentDataDelete = (roll) => {

  const conData = confirm("Are You Sure!");

    if(conData){
      const getOldData = getDataLs("students");
  const updateData = getOldData.filter((data) => data.roll !== roll);

  sendDataLs("students",updateData);
  getShowStudentData();
    }else{

    }
  
};




// Create New Student Data 

Create_new_student_form.onsubmit = (e) => {
    e.preventDefault();

    const form_data = new FormData(e.target);
    const data = Object.fromEntries(form_data.entries())

    // validation

     if(!data.name || !data.roll || !data.reg){
       alertSmg.innerHTML = createAlert("<b>All field are required</b>");
     }else{
      
// previous data 
       const prevData = getDataLs("students");

 // check roll and reg number 
 
      if(prevData.some((item) => item.roll === data.roll)){
        alertSmg.innerHTML = createAlert("<b>Roll Number Already Receive</b>");
        return;
      };

      if(prevData.some((item) => item.reg === data.reg)){
        alertSmg.innerHTML = createAlert("<b>Registration Number Already Receive</b>");
        return;
      };

       prevData.push({

        ...data ,
        result: null,
       id: getRandomUniqueStringId(26),
       });

       sendDataLs("students",prevData);
       e.target.reset();
       getShowStudentData();
       alertSmg.innerHTML = createAlert(`<strong>${data.name}</strong> create successfully`)
      
       setTimeout(() =>{
        add_new_student_close.click();
       },3000);
     };
};