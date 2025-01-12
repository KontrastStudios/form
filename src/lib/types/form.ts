export interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface CompanyInformationFormData {
  companyName: string;
  companyType: string;
  industry: string;
  employeeCount: number;
}

export interface AddressFormData {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentFormData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  nameOnCard: string;
}

export interface FormState {
  signUp: SignUpFormData;
  companyInfo: CompanyInformationFormData;
  address: AddressFormData;
  payment: PaymentFormData;
}