/**
 * create a alert
 */


const createAlert = (smg, type="danger") => {
    return `<p class="alert alert-${type} d-flex justify-content-between">
                            ${smg}
        <button class="btn-close" data-bs-dismiss="alert"></button>
    </p>`
};


/**
 * Check number
 */

const isNumber = (num) => {
    const pattern = /^([0-9],{6,})$/

    return pattern.test(num);
};


/**
 * Send Data to Ls
 */


const sendDataLs = (key,data) => {
    localStorage.setItem(key,JSON.stringify(data));
};


/**
 * Get Data from Ls
 */

const getDataLs = (key) => {

    if(localStorage.getItem(key)){
     return JSON.parse(localStorage.getItem(key));
    }else{
        return [];
    };
};


/**
 * Id Create function
 */


const getRandomUniqueStringId = (length = 26) =>{
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    const idLength = Math.max(1, Math.min(length, 40));
  
    let result = '';
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      const randomValues = new Uint32Array(idLength);
      crypto.getRandomValues(randomValues);
      for (let i = 0; i < idLength; i++) {
        result += characters.charAt(randomValues[i] % charactersLength);
      }
    } else {
      for (let i = 0; i < idLength; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
    }
  
    return result;
  }
  

  /**
   * Get GPA and Grade 
   */

  const getGpaGrade = (marks) => {
    let gpa;
    let grade;
  
    if (marks >= 0 && marks < 33) {
      gpa = 0;
      grade = "F";
    } else if (marks >= 33 && marks < 40) {
      gpa = 1;
      grade = "D";
    } else if (marks >= 40 && marks < 50) {
      gpa = 2;
      grade = "C";
    } else if (marks >= 50 && marks < 60) {
      gpa = 3;
      grade = "B";
    } else if (marks >= 60 && marks < 70) {
      gpa = 3.5;
      grade = "A-";
    } else if (marks >= 70 && marks < 80) {
      gpa = 4;
      grade = "A";
    } else if (marks >= 80 && marks <= 100) {
      gpa = 5;
      grade = "A+";
    }
    return {
      gpa: gpa,
      grade: grade,
    };
  };
  

  /**
   * Get Final Result
   */


   const getFinalResult = (marks) => {
      
       let cgpa;
       let result;


       let totalCgpa = getGpaGrade(marks.bangla).gpa +
                       getGpaGrade(marks.english).gpa +
                       getGpaGrade(marks.math).gpa +
                       getGpaGrade(marks.science).gpa +
                       getGpaGrade(marks.social_science).gpa +
                       getGpaGrade(marks.religion).gpa;

         cgpa = totalCgpa / 6;


      
       if(marks.bangla >= 33 &&
         marks.english >= 33 && 
         marks.math >= 33 && 
         marks.science >= 33 && 
         marks.social_science >= 33 && 
         marks.religion >= 33)
         {
   
          if( cgpa >= 1 && cgpa < 2){
            result = "D";
          }else if(cgpa >= 2 && cgpa < 3){
            result = "C";
          }else if(cgpa >= 3 && cgpa < 3.5){
            result = "B";
          }else if(cgpa >= 3.5 && cgpa < 4){
            result = "-A";
          }else if(cgpa >= 4 && cgpa < 5){
            result = "A";
          }else if( cgpa >= 5){
            result = "A+";
          }

          return { 
            result : result,
            cgpa : cgpa,
          }

       }else {
        return{

          result: "F",
          cgpa: cgpa,

        };
       };
   };