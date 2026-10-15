# Jira Sub-task Preview

Parent Story: EVA-2583

Total Sub-tasks: 29

---

## PDS-FHIR-001 - Use Cases

Functional Area: Uncategorised

Question:
Use Cases

Current SCAL Response: The care settings that we will be looking to utilise the PDS HCW access will be as follows;
 * 111
 * UTC
 * CAS
 * OOH
 * PharmacyThe API will be used by registered Heathcare professionals to be able to search and locally register patients in order to be able to provide urgent treatment and provide health care.The endpoints that we use are as follows;
  GET /Patient
  GET /Patient/{id}
  GET /Patient/{id}/RelatedPersonAt this point in time we are not looking to perform any PDS updates and will use the PDS data as the source of truth

---

## PDS-FHIR-EUOODS -1 - Is your software going to be deployed in multiple end user organisations

Functional Area: Healthcare Worker Access & Security

Question:
Is your software going to be deployed in multiple end user organisations?

Current SCAL Response: Yes

---

## PDS-FHIR-FLGINV-1 - Invalidated Record Warning

Functional Area: Sensitive Patients

Question:
Does your product warn the end-user of an invalidated patient record?

---

## PDS-FHIR-FLGINV-1.1 - display the specific required information when warning of an invalidated pati...

Functional Area: Sensitive Patients

Question:
Does your product display the specific required information when warning of an invalidated patient record?

---

## PDS-FHIR-FLGINV-1.2 - continue to provide the required warnings to the end-user about an invalidate...

Functional Area: Sensitive Patients

Question:
Does your product continue to provide the required warnings to the end-user about an invalidated patient record?

---

## PDS-FHIR-FLGINV-2 - Invalidated Record Decoupling

Functional Area: Sensitive Patients

Question:
Does your product de-couple an invalidated patient record from PDS?

---

## PDS-FHIR-FLGSEN-1 - display any of the specified information for a sensitive patient record to us...

Functional Area: Sensitive Patients

Question:
Does your product display any of the specified information for a sensitive patient record to users without appropriate role-based access controls (RBAC) rights?

---

## PDS-FHIR-FLGSEN-1.1 - restrict access to location information for a sensitive patient

Functional Area: Sensitive Patients

Question:
Does your product restrict access to location information for a sensitive patient?

Current SCAL Response: Yes

---

## PDS-FHIR-FLGSEN-1.1.1 - use role-based access controls (RBAC) to restrict access to location informat...

Functional Area: Sensitive Patients

Question:
Does your product use role-based access controls (RBAC) to restrict access to location information for a sensitive patient?

Current SCAL Response: Yes

---

## PDS-FHIR-FLGSEN-1.1.2 - allow authorised users to access and update locally-held location information...

Functional Area: Sensitive Patients

Question:
Does your product allow authorised users to access and update locally-held location information for a sensitive patient?

Current SCAL Response: No

---

## PDS-FHIR-FLGSEN-3 - Sensitive Patient Warning

Functional Area: Sensitive Patients

Question:
On selection, does your product warn the end user that a patient is sensitive?

Current SCAL Response: No

---

## PDS-FHIR-FLGSEN-3.1 - include specific information in warning about a sensitive patient

Functional Area: Sensitive Patients

Question:
Does your product include specific information in warning about a sensitive patient?

---

## PDS-FHIR-FLGSEN-6 - overwrite locally-held location information for a sensitive patient

Functional Area: Sensitive Patients

Question:
Does your product overwrite locally-held location information for a sensitive patient?

---

## PDS-FHIR-FLGSUP-1 - tracing for a patient using the NHS Number, does your product warn the user t...

Functional Area: Sensitive Patients

Question:
When tracing for a patient using the NHS Number, does your product warn the user that the record returned has a different NHS Number to the one that was traced for? (i.e. is superseded)?

Current SCAL Response: Yes

---

## PDS-FHIR-FLGSUP-1.1 - display the specific required information when warning of a superseded patien...

Functional Area: Sensitive Patients

Question:
Does your product display the specific required information when warning of a superseded patient record?

Current SCAL Response: That the NHS number being used has been replaced, That the patient should be informed of the replacement number (where possible)

---

## PDS-FHIR-FLGSUP-2 - replace the NHS number for a superseded patient record

Functional Area: Sensitive Patients

Question:
Does your product replace the NHS number for a superseded patient record?

Current SCAL Response: Yes

---

## PDS-FHIR-FLGSUP-3 - refer superseded record confusion cases to Local Back Office

Functional Area: Sensitive Patients

Question:
Does your product refer superseded record confusion cases to Local Back Office?

Current SCAL Response: No

---

## PDS-FHIR-PDS-PCP-8 - Pass Correct User Profile ID

Functional Area: Healthcare Worker Access

Question:
Does your product pass the correct User Profile ID (URPID) when calling the PDS FHIR API?

---

## PDS-FHIR-PDSPCP-3 - synchronise your Local Patient Index

Functional Area: Healthcare Worker Access

Question:
Does your product synchronise your Local Patient Index?

Current SCAL Response: Yes

---

## PDS-FHIR-PDSPCP-3.1 - continue to provide care if synchronisation fails

Functional Area: Healthcare Worker Access

Question:
Does your product continue to provide care if synchronisation fails?

Current SCAL Response: Yes

---

## PDS-FHIR-PDSPCP-4 - implemented role-based access controls (RBAC)

Functional Area: Healthcare Worker Access

Question:
Have you implemented role-based access controls (RBAC)?

Current SCAL Response: Yes

---

## PDS-FHIR-PDSPCP-7 - have an end-user

Functional Area: Healthcare Worker Access

Question:
Does your product have an end-user?

Current SCAL Response: Yes

---

## PDS-FHIR-RTLMT-1 - The default rate limit for PDS FHIR is 5 transactions per second (TPS), can y...

Functional Area: Healthcare Worker Access & Security

Question:
The default rate limit for PDS FHIR is 5 transactions per second (TPS), can you confirm your product will comply with the default rate limit

Current SCAL Response: Yes

---

## PDS-FHIR-SNCSCN-5 - warn the end user of key field changes

Functional Area: PDS Synchronisation

Question:
Does your product warn the end user of key field changes?

Current SCAL Response: Yes

---

## PDS-FHIR-SNCSCN-5.1 - allow the end-user to review key field changes

Functional Area: PDS Synchronisation

Question:
Does your product allow the end-user to review key field changes?

Current SCAL Response: No

---

## PDS-FHIR-SNCSCN-6 - accept key field changes if no end-user is present

Functional Area: PDS Synchronisation

Question:
Does your product accept key field changes if no end-user is present?

Current SCAL Response: Yes

---

## PDS-FHIR-TRCDPY-2 - display the matching level in search results

Functional Area: Patient Search & Results Handling

Question:
Does your product display the matching level in search results?

Current SCAL Response: No

---

## PDS-FHIR-TRCDPY-2.1 - display search results in the order returned from PDS

Functional Area: Patient Search & Results Handling

Question:
Does your product display search results in the order returned from PDS?

Current SCAL Response: Yes

---

## PDS-FHIR-TRCDPY-4 - display the sensitive patient flag in search results

Functional Area: Patient Search & Results Handling

Question:
Does your product display the sensitive patient flag in search results?

Current SCAL Response: No
