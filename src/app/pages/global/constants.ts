export const constants = {
    NO_INTERNET_CONNECTION_MSG: 'No Internet Connection',
    ROLE: {
        AGENT: 'agent',
        USER: 'user'
    },
    BUSINESS_CATEGORIES: [
        { value: 'Individual' },
        { value: 'Corporate' }
    ],
    BUSINESS_CATEGORIES_INDIVIDULES: 'Individual',
    BUSINESS_CATEGORIES_CORPORATE: 'Corporate',
    LOCALSTORAGE_DB_KEY_NAME: 'PWA-Angular-STARTER',
    MOBILE_NUMBER: 'Mobile Number',
    EMAIL: 'Email Address',
    OTP_FROM: {
        SIGN_UP_MOBILE: 'signUpMobile',
        SIGN_UP_EMAIL: 'signUpEmail',
        FORGOT_PASSWORD_MOBILE: 'forgotPasswordMobile',
        FORGOT_PASSWORD_EMAIL: 'forgotPasswordEmail',
    },
    RESEND_OTP_TIME: 120,
    AGENT_DOCUMENT_REQUIRED: {
        INDIVIDUAL: {
            ID_CARD: 'ID Card',
            BANK_STATMENT: 'Bank Statement'
        },
        CORPORATE: {
            CAC_CERTIFICATE: 'CAC Certificate',
            CAC_FROM_A: 'CAC Form A',
            UTILITY_BILL: 'Utility Bill',
            MEANS_OF_IDENITIFICATION: 'Means of Identification for one director'
        }
    },
    AGENT_DOCUMENT_DATA: {
        INDIVIDUAL: [
            { value: 'ID Card', fromControlName: 'idCard' },
            { value: 'Bank Statement', fromControlName: 'BankStatment' }
        ],
        CORPORATE: [
            { value: 'CAC Certificate', fromControlName: 'cacCertificate' },
            { value: 'CAC Form A', fromControlName: 'cacFromA' },
            { value: 'Utility Bill', fromControlName: 'utilityBill' },
            { value: 'Means of Identification for one director', fromControlName: 'meansOfIdenitification' }
        ]
    },
    FILE_UPLOAD_SIZE_LIMIT: 10000000,
    KYC_STATUS: {
        VERIFIED: 'Verified',
        NOT_VERIFIED: 'NotVerified'
    },
    WALLET_SETUP_TYPE: {
        BANK: 'bank',
        CARD: 'card'
    },
    DOCUMENT_UPLOAD_FILE_EXTENSION: '.pdf,.jpg,.jpeg, .png',
    SET_KYC: 'setKyc'
};

export const KYC_STATUS = {
    VERIFIED: 'Verified',
    UNVERIFIED: 'NotVerified'
};

export const PROFILE_CONTROLS = {
    FIRSTNAME: 'firstName',
    LASTNAME: 'lastName',
    EMAIL: 'email',
    MOBILE: 'mobile'
};

export const LOCAL_STORAGE_KEYS = {
    TOKEN: 'token',
    FIRSTNAME: 'firstname',
    LASTNAME: 'lastname',
    FULLNAME:'fullname',
    PROFILE: 'profile',
    ID: 'id',
    ROLE: 'role',
    MOBILE: 'mobile',
    COUNTRY_CODE:'country_code',
    BUSINESS_CATEGORIES: 'businessCategories',
    KYC_STATUS: 'kycStatus',
    EMAIL: 'email',
    IS_REFERAL_CODE: 'is-referal-code',
    IS_VERIFIED: 'is_verified',
    PROFILE_IMAGE: 'profile_image',
    BUSINESS_NAME: 'businessName',
    SKIP_KYC: 'skipKyc',
    SUBSCRIPTION:'subscription',
    SELECTED_EVENT:'selectEvent',
};

export const USER_ROUTES = {
    SIGN_UP: 'user/sign-up',
    VERIFY_OTP: 'user/verify-otp',
    RESEND_OTP: 'user/resend-otp',
    SIGN_IN: 'user/sign-in',
    FORGOT_PASSWORD: 'user/forgot-password',
    VERIFY_PASSWORD_LINK: 'user/reset-password?',
    RESET_PASSWORD: 'user/reset-password',
    VERIFY_EMAIL: 'user/verify-email?uniqueCode=',
    CHANGE_PASSWORD: 'user/change-password',
    UPLOAD_DOCUMENT: 'user/upload-document',
    SET_TRANSACTION_PIN: 'user/transaction-pin',
    RESEND_EMAIL_LINK: 'user/resend-link',
    KYC_SUBMIT: 'user/kyc-verification',
    SET_WALLET: 'user/bank-account',
    KEY_VERIFICATION: 'user/kyc-verification',
    PROFILE: 'user/profile',
    UPLOAD_IMAGE: 'user/upload-image',
    GET_PROFILE:'user/get-profile',
    SUBSCRIPTION:'subscription/get-subscription-list',
    CARD:'user/card',
    PURCHASE:'/subscription/purchase-subscription',
   SKIPSUBSCRIPTION:'subscription/skip-subscription',
   REQUEST_OTP:'user/request-otp',
   EDIT_PROFILE:'user/edit-profile',
   ADD_EVENT:'events/add-event',
   GET_PUBLIC_EVENT:'events/public-event-list?page=0',
   GET_PRIVATE_EVENT:'events/private-event-list?page=0',
   GET_UPCOMING_EVENT:'my-event/upcoming-event-list?page=0',
   GET_CURRENT_EVENT:'my-event/current-event-list?page=0',
   GET_CONTACT:'events/sync-contact-list',
   GET_PAST_EVENT:'my-event/past-event-list?page=0',
   GET_FAQS:'faq/faq-list',
   GET_ABOUTUS:'content/page/about-us',
   GET_BLOCKUSER_LIST:'user/block-user-list',
   GET_PAYMENT_TERMS:'content/page/payment-terms',
   GET_TERMS_CONDITION:'content/page/term-and-condition',
   UNBLOCK_USER:'user/unblock-user',
   EDIT_EVENT:'events/edit-event',
   EVENT_DETAIL:'events/event-details',
   UPDATE_SETTINGS:'user/update-settings',
   CONTACT_US:'user/contact-us',
   ADD_MEMBER:'/events/add-member',
   CARD_LIST:'user/card-list',
   REFERRAL_CODE:'user/user-referral-code-count',
   DELET_EVENT:'events/delete-event/'
};

export const OTP_TYPES = {
    SIGN_UP_MOBILE: 'signUpMobile',
    SIGN_UP_EMAIL: 'signUpEmail',
    FORGOT_PASSWORD_MOBILE: 'forgotPasswordMobile',
    FORGOT_PASSWORD_EMAIL: 'forgotPasswordEmail'
};

export const AGENT_MERCHANT_CATEGORY = [
    {
        INDIVIDUAL: 'Individual',
        CORPORATE: 'Corporate'
    }
];

export const TRANSACTION_PIN_CONFIG = {
    PIN_LENGTH: 4,
    PIN_CLASSES: 'pin-input-control d-inline',
    PIN_AUTO_FOCUS: true,
    IS_PASSWORD_INPUT: true,
    ALLOW_ONLY_NUMBERS: true
};

export const PIN_TYPE = {
    OLD_PIN: 'oldPin',
    NEW_PIN: 'newPin',
    CONFIRM_PIN: 'confirmPin'
};

export const ROUTE_PATHS = {
    HOME: 'home',
    RESET_PASSWORD: 'reset-password',
    VERIFY_PASSWORD: 'verify-email/:uniqueCode',
    WALLET_SETUP: 'wallet-setup',
    MY_WALLET: 'my-wallet',
    PROFILE: 'profile',
    ADD_MONEY_BANK: 'add-money-bank',
    TRANSFER_MONEY: 'transfer-money',
    WITHDRAW_MONEY: 'transfer-withdraw-money',
    PRIVACY_POLICY: 'privacy-policy',
    TERMS_AND_CONDITION: 'terms-and-condition',
    LOGIN: 'login',
    SIGNUP: 'register',
    FORGOTPASSWORD:'forgot-password',
    OTP:'otp',
    AUTH:'',
    CHAT:'chat',
    CREATEEVENT:'create-event',
    MYEVENT:'myevent',
    SUBSCRIPTION:'subscription',
    CONTACT:'contact',
    ADDCONTACT:'add-contact',
    SETTING:'setting',
    CHANGE_PASSWORD:'change-password',
    BLOCKED_USER:'blocked-user',
    ABOUT_US:'about-us',
    CONTACT_US:'contact-us',
    FAQ:'faqs',
    PAYMENT_TERMS:'payment-terms',
    PUSH_NOTIFICATION:'push-notification',
    REFER_FRIEND:'refer-friend',
    TERM_CONDITION:'term-condition',
    LIVE_EVENTS:'Live',
    MEDIA:'media',



};

export const PROFILE_ROUTE = {
    PROFILE_HOME: 'profile',
    EDIT_PROFILE: 'edit-profile',
    CHANGE_PASSWORD: 'change-password',
    TRANSACTION_PIN: 'transation-pin',
    MY_TRANSACTION: 'my-transation',
    ACCOUNT_SETTING: 'account-setting',
    PAYMENT_SETTING: 'payment-setting',
    ADD_MONEY_DASHBOARD: 'add-money',
    MY_DOCUMETS: 'my-documents',
    MY_COMMISSIONS: 'my-commissions'
};
