import * as yup from 'yup';


export const validationSchemas =()=>{
    return yup.object({  
    //   {name:'',email:'',phoneNumber:'',Alternate_Phone_Number:'',office:'',
    // Building:'',Sector:'',Pincode:'',gstNumber:'',password:""}
    name: yup
      .string('Enter Your First Name')
      .matches(/^[a-zA-Z ]{2,}$/,'Enter vaild first name')
      .required('Name is required'),
    email: yup
      .string('Enter your email')
      .required('Email is required')
      .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Invalid Email Format"),
    phoneNumber: yup
    .number('Only Number Allowed')
    .required('Phone number is required'),
    Alternate_Phone_Number: yup
    .number('Only Number Allowed')
    .required('Alternate Number is required'),
    office: yup
      .string('Enter Office No')
      .required('Office No is required'),
    Building: yup
      .string('Enter Building Name')
      .required('Building Name is required'),
    Sector: yup
      .string('Enter Pincode Name')
      .required('Pincode Name is required'),
    Pincode: yup
      .string('Enter Sector Name')
      .required('Sector Name is required'),
    gstNumber: yup
      .string('Enter GST No')
      .required('GST No is required'),
    password: yup
      .string('Enter your password')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"A minimum 8 characters password contains a combination of uppercase and lowercase letter and number are required.")
      .required('Password is required'),
    confirm_password: yup
      .string('Enter your Confirm Password')
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  })
};

export const loginvalidationSchemas =()=>{
  return yup.object({
  email: yup
    .string('Enter your email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .required('Password is required'),
})
};