import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Constant } from '../_global/constant';
import { Lesson } from '../_models/lesson';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public _baseURL: string;
  constructor(private http: HttpClient, private router: Router) {
    this._baseURL = Constant.baseURL;
  }

  getProjects() {
    return this.http.get<any>(`${this._baseURL}/projects`);
  }
  getProcess() {
    return this.http.get<any>(`${this._baseURL}/process`);
  }
  // getProjects(projectTypeId: string) {
  //   return this.http.post<any>(`${this._baseURL}/projects`,{projectTypeId:projectTypeId});
  // }
  getProjecttype() {
    return this.http.get<any>(`${this._baseURL}/projecttype`);
  }
  // getMappingProjectAndProjecttype() {
  //   return this.http.get<any>(`${this._baseURL}/projecttype`);
  // }
  getMappingProjectTypeAndProject(ProjecttypeID: string) {
    return this.http.post<any>(`${this._baseURL}/mappingprojectprojecttype`, { ProjecttypeID: ProjecttypeID });
  }

  getMappingProjectAndMilestone(ProjecttypeID) {
    return this.http.post<any>(`${this._baseURL}/mappingprojecttypemilestones`, { ProjecttypeID: ProjecttypeID });
  }

  getMappingProjectTypeAndPhase(ProjecttypeID) {
    return this.http.post<any>(`${this._baseURL}/mappingprojectphase`, { ProjecttypeID: ProjecttypeID });
  }

  addLesson(o: Lesson) {
    return this.http.post<any>(`${this._baseURL}/lessons/add`, o);
  }
  getUserLessons() {
    return this.http.get<any>(`${this._baseURL}/lessons/project`);
  }
  getUserProcessLessons() {
    return this.http.get<any>(`${this._baseURL}/lessons/process`);
  }
  getKeywords() {
    return this.http.get<any>(`${this._baseURL}/keywords`);
  }
  getmilestones() {
    return this.http.get<any>(`${this._baseURL}/milestones`);
  }
  getimpactlevel() {
    return this.http.get<any>(`${this._baseURL}/impactlevel`);
  }
  getcategories() {
    return this.http.get<any>(`${this._baseURL}/impactcategory`);
  }

  // getProjectPhase(projectId : string) {
  //   return this.http.post<any>(`${this._baseURL}/phases`,{project:projectId});
  // }
  getProjectPhase() {
    return this.http.get<any>(`${this._baseURL}/phases`);
  }
  // getProjectPhase() {
  //   return this.http.post<any>(`${this._baseURL}/phases`);
  // }

  getFilterLessons(o: object) {
    return this.http.post<any>(`${this._baseURL}/users/filterLesson`, o);
  }

  getProjectPhaseMilestone(phaseId: string) {
    return this.http.post<any>(`${this._baseURL}/milestones`, { phase: phaseId });
  }

  // getUserLessons(user : string) {
  // var _user = JSON.parse(localStorage.getItem('currentUser'));
  //   return this.http.post<any>(`${this._baseURL}/users/userlessons`,{user:_user.displayName});
  // }  

  getlessonsBarChart() {
    return this.http.get<any>(`${this._baseURL}/users/mlessonchart`);
  }

  getlessonsUserPieChart() {
    return this.http.get<any>(`${this._baseURL}/users/puserlessonchart`);
  }

  getlessons() {
    return this.http.get<any>(`${this._baseURL}/lesson`);
  }
  getmilestonePiechart(ID) {
    return this.http.post<any>(`${this._baseURL}/milestones/milestonechart`, { ID });
  }
  getfunctionPiechart() {
    return this.http.get<any>(`${this._baseURL}/functions/functionschart`);
  }
  //flag=0 ->non implemented(id=0) flag=1 -> Implemented(id=1)
  getimplemented() {
    return this.http.post<any>(`${this._baseURL}/userusefullesson/countbyid`, { id: 1 });
  }
  getnotimplemented() {
    return this.http.post<any>(`${this._baseURL}/userusefullesson/countbyid`, { id: 0 });
  }
  getlessonbymonth() {
    return this.http.get<any>(`${this._baseURL}/lessons/monthdata`);
  }

  getlessonbyproject() {
    return this.http.post<any>(`${this._baseURL}/lessons/countlessontype`, { id: 1 });
  }
  getlessonbyprocess() {
    return this.http.post<any>(`${this._baseURL}/lessons/countlessontype`, { id: 2 });
  }
  getlessonbyissue() {
    return this.http.post<any>(`${this._baseURL}/lessons/counttype`, { id: 1 });
  }
  getlessonbypractice() {
    return this.http.post<any>(`${this._baseURL}/lessons/counttype`, { id: 2 });
  }

  getprojectPiechart(ID) {
    return this.http.post<any>(`${this._baseURL}/projects/projectpiechart`, { ID });
  }

  getphasebarchart(ID) {
    return this.http.post<any>(`${this._baseURL}/phases/phasebarchart`, { ID });
  }
  getdepartbarchart() {
    return this.http.get<any>(`${this._baseURL}/departments/departmentbarchart`);
  }
  getdepartbarchart1() {
    return this.http.get<any>(`${this._baseURL}/departments/departmentbar`);
  }
  getcategorybarchart() {
    return this.http.get<any>(`${this._baseURL}/impactcategory/impactcategorybarchart`);
  }
  getimpactcategorybarchart() {
    return this.http.get<any>(`${this._baseURL}impactcategory/impactcategorybarchart`);
  }
  getlessonsDeptPieChart() {
    return this.http.get<any>(`${this._baseURL}/users/pdeptlessonchart`);
  }

  getlessonsProjPieChart() {
    return this.http.get<any>(`${this._baseURL}/users/pprojlessonchart`);
  }

  getlessonsCatPieChart() {
    return this.http.get<any>(`${this._baseURL}/users/pcatlessonchart`);
  }

  getlessonsLevelPieChart() {
    return this.http.get<any>(`${this._baseURL}/users/plevellessonchart`);
  }

  deletelesson(ID: number) {
    return this.http.post<any>(`${this._baseURL}/lessons/delete`, { ID });
  }



  getlessonbyProjectID(ID: number) {
    console.log(ID, "getlessonbyPojectID");
    return this.http.post<any>(`${this._baseURL}/lessons/porject/id`, { ID });
  }

  getlessonbyProcessID(ID: number) {
    console.log(ID, "getlessonbyProcessID");
    return this.http.post<any>(`${this._baseURL}/lessons/process/id`, { ID });
  }

  getAllFilterLessons(o: object) {
    return this.http.post<any>(`${this._baseURL}/lessons/project/filter`, o);
  }
  getAllFilterLessonsProcess(o: object) {
    return this.http.post<any>(`${this._baseURL}/lessons/process/filter`, o);
  }
  getProjectByID(ID) {
    return this.http.post<any>(`${this._baseURL}/projects/projectgetbyid`, { ID: ID });
  }
  updateLPN(id, lpn) {
    return this.http.post<any>(`${this._baseURL}/projects/update`, { ID: id, LPN: lpn });
  }
  getuserlikes(ID: number) {
    return this.http.post<any>(`${this._baseURL}/userlike`, { LessonID: ID });
  }
  adduserlikes(UserID, LessonID, Likes) {
    return this.http.post<any>(`${this._baseURL}/userlike/add`, { UserID, LessonID, Likes: 1 });
  }

  uploadFile(attachment) {

    return this.http.post<any>(`${this._baseURL}/lessons/attachment`, attachment);
  }
  addMappingLessonAttachmentSQL(lessonID, attachmentID) {
    return this.http.post<any>(`${this._baseURL}/lessons/mappingattachment`, { lessonID: lessonID, attachmentID: attachmentID });
  }
  getLessonAttachment(LessonID) {
    console.log(LessonID);
    return this.http.post<any>(`${this._baseURL}/lessons/getattachment`, { ID: LessonID });
  }
  deleteAttachmnet(LessonID) {
    console.log(LessonID);
    return this.http.post<any>(`${this._baseURL}/lessons/deleteattachment`, { ID: LessonID });
  }

  getfreesearchByFilter(searchname) {
    return this.http.post<any>(`${this._baseURL}/lessons/freesearch`, { data: searchname });
  }
  getdepartments() {
    return this.http.get<any>(`${this._baseURL}/departments`);
  }
  getfunctions() {
    return this.http.get<any>(`${this._baseURL}/functions`);
  }
  getlessontype() {
    return this.http.get<any>(`${this._baseURL}/lessons/type`);
  }
  getAllKeywordsByID(LessonID) {
    return this.http.post<any>(`${this._baseURL}/lessons/keywords/id`, { ID: LessonID });
  }
  deleteAlluserlikeSQL(ID) {
    return this.http.post<any>(`${this._baseURL}/userlike/dislike`, { ID: ID });
  }
  adduserusefullesson(LessonID, UserID, title) {
    return this.http.post<any>(`${this._baseURL}/userusefullesson/add`, { LessonID, UserID, Description: title, flag: 1 });
  }
  adduserusefullessonforNo(LessonID, UserID, data, title) {
    return this.http.post<any>(`${this._baseURL}/userusefullesson/add`, { LessonID, UserID, Description: title, flag: 0 });
  }
  checkUserLike(LessonID, UserID) {
    return this.http.post<any>(`${this._baseURL}/userlike/checklike`, { LessonID, UserID });
  }
  getAttachmentNameByID(LessonID) {
    return this.http.post<any>(`${this._baseURL}/lessons/attachment/lessonid`, { LessonID: LessonID });
  }
  getuserusefullesson() {
    return this.http.get<any>(`${this._baseURL}/userusefullesson`);
  }
  AddProjects(o) {
    return this.http.post<any>(`${this._baseURL}/projects/add`, o);
  }
  getlifecycle() {
    return this.http.get<any>(`${this._baseURL}/lifecycle`);
  }
  getProjecttype1(data) {
    return this.http.get<any>(`${this._baseURL}/projecttype`);
  }
  addmappingprojectprojecttype(ProjectID, ProjecttypeID) {
    return this.http.post<any>(`${this._baseURL}/mappingprojectprojecttype/add`, { ProjectID, ProjecttypeID });
  }
  AddProjecttype(o) {
    return this.http.post<any>(`${this._baseURL}/projecttype/add`, o);
  }
  Addmilestones(o) {
    return this.http.post<any>(`${this._baseURL}/milestones/add`, o);
  }
  addmappingprojectypemilestone(ProjecttypeID, MilestoneID) {
    return this.http.post<any>(`${this._baseURL}/mappingprojecttypemilestones/add`, { ProjecttypeID, MilestoneID });
  }
  Addphases(o) {
    return this.http.post<any>(`${this._baseURL}/phases/add`, o);
  }
  Addimpectlevel(o) {
    return this.http.post<any>(`${this._baseURL}/phases/add`, o);
  }
  addmappingprojectypephase(ProjecttypeID, PhaseID) {
    return this.http.post<any>(`${this._baseURL}/mappingprojectphase/add`, { ProjecttypeID, PhaseID });
  }
  Addlifecycle(o) {
    return this.http.post<any>(`${this._baseURL}/lifecycle/add`, o);
  }
  Addfunction(o) {
    return this.http.post<any>(`${this._baseURL}/functions/add`, o);
  }
  Adddepartment(o) {
    return this.http.post<any>(`${this._baseURL}/departments/add`, o);
  }
  Addimpactcategory(o) {
    return this.http.post<any>(`${this._baseURL}/impactcategory/add`, o);
  }
  Addimpactlevel(o) {
    return this.http.post<any>(`${this._baseURL}/impactlevel/add`, o);
  }
  Addprocess(o) {
    return this.http.post<any>(`${this._baseURL}/process/add`, o);
  }
  uploadbulkFile(bulkcsv) {

    return this.http.post<any>(`${this._baseURL}/lessons/bulkupload`, bulkcsv);
  }
  getAllBulk() {
    return this.http.get<any>(`${this._baseURL}/lessons/bulk`);
  }
  generateErrorFile(ID) {
    return this.http.post<any>(`${this._baseURL}/lessons/errorexcel`, { ID: ID });
  }
  updateprocess(ID, Indexing) {
    return this.http.post<any>(`${this._baseURL}/process/update`, { ID, Indexing });
  }
  updatelifecycle(ID, Indexing) {
    return this.http.post<any>(`${this._baseURL}/lifecycle/update`, { ID, Indexing });
  }
  updatefunction(ID, Indexing) {
    return this.http.post<any>(`${this._baseURL}/functions/update`, { ID, Indexing });
  }
  updatedepartment(ID, Indexing) {
    return this.http.post<any>(`${this._baseURL}/departments/update`, { ID, Indexing });
  }
  updateimpactcategory(ID, Indexing) {
    return this.http.post<any>(`${this._baseURL}/impactcategory/update`, { ID, Indexing });
  }
  updateimpactlevel(ID, Indexing) {
    return this.http.post<any>(`${this._baseURL}/impactlevel/update`, { ID, Indexing });
  }
  updateprojecttype(ID, Indexing) {
    return this.http.post<any>(`${this._baseURL}/projecttype/update`, { ID, Indexing });
  }
  updateprojectindex(ID, Indexing) {
    return this.http.post<any>(`${this._baseURL}/projects/updateindex`, { ID, Indexing });
  }
  updatephase(ID, Indexing) {
    return this.http.post<any>(`${this._baseURL}/phases/update`, { ID, Indexing });
  }
  updatemilestone(ID, Indexing) {

    return this.http.post<any>(`${this._baseURL}/milestones/update`, { ID, Indexing });
  }
  getProjecttypebyid(ID) {
    return this.http.post<any>(`${this._baseURL}/projecttype/id`, { ID });
  }
  updateprojecttypebyid(ID, Name) {
    return this.http.post<any>(`${this._baseURL}/projecttype/updatename`, { ID, Name });
  }
  getprojectbyid(ID) {
    return this.http.post<any>(`${this._baseURL}/projects/id`, { ID });
  }
  updateprojectbyid(ID, Name) {
    return this.http.post<any>(`${this._baseURL}/projects/updatename`, { ID, Name });
  }
  getphasesbyid(ID) {
    return this.http.post<any>(`${this._baseURL}/phases/id`, { ID });
  }
  updatephasesbyid(ID, Name) {
    return this.http.post<any>(`${this._baseURL}/phases/updatename`, { ID, Name });
  }
  getmilestonesbyid(ID) {
    return this.http.post<any>(`${this._baseURL}/milestones/id`, { ID });
  }
  updatemilestonesbyid(ID, Name) {
    return this.http.post<any>(`${this._baseURL}/milestones/updatename`, { ID, Name });
  }
  getlifecyclebyid(ID) {
    return this.http.post<any>(`${this._baseURL}/lifecycle/id`, { ID });
  }
  updatelifecyclebyid(ID, Name) {
    return this.http.post<any>(`${this._baseURL}/lifecycle/updatename`, { ID, Name });
  }
  getfunctionsbyid(ID) {
    return this.http.post<any>(`${this._baseURL}/functions/id`, { ID });
  }
  updatefunctionsbyid(ID, Name) {
    return this.http.post<any>(`${this._baseURL}/functions/updatename`, { ID, Name });
  }
  getdepartmentsbyid(ID) {
    return this.http.post<any>(`${this._baseURL}/departments/id`, { ID });
  }
  updatedepartmentsbyid(ID, Name) {
    return this.http.post<any>(`${this._baseURL}/departments/updatename`, { ID, Name });
  }
  getimpactcategorybyid(ID) {
    return this.http.post<any>(`${this._baseURL}/impactcategory/id`, { ID });
  }
  updateimpactcategorybyid(ID, Name) {
    return this.http.post<any>(`${this._baseURL}/impactcategory/updatename`, { ID, Name });
  }
  getimpactlevelbyid(ID) {
    return this.http.post<any>(`${this._baseURL}/impactlevel/id`, { ID });
  }
  updateimpactlevelbyid(ID, Name) {
    return this.http.post<any>(`${this._baseURL}/impactlevel/updatename`, { ID, Name });
  }
  getprocessbyid(ID) {
    return this.http.post<any>(`${this._baseURL}/process/id`, { ID });
  }
  updateprocessbyid(ID, Name) {
    return this.http.post<any>(`${this._baseURL}/process/updatename`, { ID, Name });
  }
  updatemappingprojectandprojecttype(ID, Indexing) {
    return this.http.post<any>(`${this._baseURL}/mappingprojectprojecttype/update`, { ID, Indexing });
  }
  updatemappingProjectAndMilestone(ID, Indexing) {
    return this.http.post<any>(`${this._baseURL}/mappingprojecttypemilestones/update`, { ID, Indexing });
  }
  updateMappingProjectTypeAndPhase(ID, Indexing) {
    return this.http.post<any>(`${this._baseURL}/mappingprojectphase/update`, { ID, Indexing });
  }
  mappingprojectphase() {
    return this.http.get<any>(`${this._baseURL}/mappingprojectphase`);
  }
  getCountimpactlevelhigh() {
    return this.http.post<any>(`${this._baseURL}/impactlevel/countbyid`, { id: 3 });
  }
  getCountimpactlevelmedium() {
    return this.http.post<any>(`${this._baseURL}/impactlevel/countbyid`, { id: 2 });
  }
  getCountimpactlevellow() {
    return this.http.post<any>(`${this._baseURL}/impactlevel/countbyid`, { id: 1 });
  }
  getAllUser(orgId) {
    return this.http.post<any>(`${this._baseURL}/user`, { orgId: orgId });
  }
  addUserRegistration(obj) {
    return this.http.post<any>(`${this._baseURL}/user/register`, obj);
  }

  addAccountSetting(obj) {
    return this.http.post<any>(`${this._baseURL}/user/account/settings`, obj);
  }
  deleteUserAccount(userID) {

    return this.http.post<any>(`${this._baseURL}/user/account/delete`, { UserID: userID });
  }
  getAllPendingUser() {
    return this.http.get<any>(`${this._baseURL}/login/google/auth/pending/user`);
  }
  getPendingUserByID(ID) {
    return this.http.post<any>(`${this._baseURL}/login/google/auth/pending/user/id`, { ID: ID });
  }
  addPaddingUserRegistration(obj) {
    return this.http.post<any>(`${this._baseURL}/user/pending/register`, obj);
  }
  pendingUserDelete(ID, Email) {
    return this.http.post<any>(`${this._baseURL}/user/pending/account/delete`, { ID: ID, Email: Email });
  }
  getFrequency() {
    return this.http.get<any>(`${this._baseURL}/notification/frequency`);
  }
  addNotification(obj) {
    return this.http.post<any>(`${this._baseURL}/notification/add`, obj);
  }
  getAllNotification(UserID) {
    return this.http.post<any>(`${this._baseURL}/notification`, { UserID: UserID });
  }
  getdefaultproject() {
    return this.http.post<any>(`${this._baseURL}/projects/projectpiechart`, { ID: 1 });
  }
  getdefaultmilestones() {
    return this.http.post<any>(`${this._baseURL}/milestones/milestonechart`, { ID: 1 });
  }
  getdefaultprojectphase() {
    return this.http.post<any>(`${this._baseURL}/phases/phasebarchart`, { ID: 1 });
  }
  deleteNotification(NtfID) {
    return this.http.post<any>(`${this._baseURL}/notification/delete`, { NtfID: NtfID });
  }
  editNotification(obj) {
    return this.http.post<any>(`${this._baseURL}/notification/edit`, obj);
  }
  getAllUserOrderByName(orderName) {
    return this.http.post<any>(`${this._baseURL}/user/ordername`, { orderName: orderName });
  }
  getAllUserOrderByDate(orderDate) {
    return this.http.post<any>(`${this._baseURL}/user/orderdate`, { orderDate: orderDate });

  }
  getAllUserOrderByRole(orderRole) {
    return this.http.post<any>(`${this._baseURL}/user/orderrole`, { orderRole: orderRole });

  }
  getAllUserOrderByStatus(orderStatus) {
    return this.http.post<any>(`${this._baseURL}/user/orderstatus`, { orderStatus: orderStatus });

  }
  getAllUserOrderByURE(orderURE) {
    return this.http.post<any>(`${this._baseURL}/user/orderure`, { orderURE: orderURE });

  }
  getallflags(LessonID) {
    return this.http.post<any>(`${this._baseURL}/userusefullesson/lessonid`, { ID: LessonID });
  }
  updateflag(flagID, flag, title) {
    return this.http.post<any>(`${this._baseURL}/userusefullesson/updateflag`, { ID: flagID, flag: flag, Description: title });
  }
  getAllOrg() {
    return this.http.get<any>(`${this._baseURL}/organization`);
  }
  addOrganization(obj) {
    return this.http.post<any>(`${this._baseURL}/organization/add`, obj);
  }
  updateOrganization(obj) {
    return this.http.post<any>(`${this._baseURL}/organization/update`, obj);
  }
  deleteOrg(orgId) {
    return this.http.post<any>(`${this._baseURL}/organization/remove`, { orgId: orgId });
  }
  getAllUserForSuperAdmin() {
    return this.http.get<any>(`${this._baseURL}/user/superadmin`);
  }
  addLogo(attachment) {
    return this.http.post<any>(`${this._baseURL}/organization/logo`, attachment);
  }
  sendEmail(userid) {
    return this.http.post<any>(`${this._baseURL}/user/email`, { userid: userid });
  }
  getAllOrgById(orgId) {
    return this.http.post<any>(`${this._baseURL}/organization/orgid`, { orgId: orgId });
  }
  customFormLessonFieldModel(obj) {
    return this.http.post<any>(`${this._baseURL}/lessons/addfield`, obj);
  }
  getAllAutocomplete(orgId) {
    return this.http.post<any>(`${this._baseURL}/autocomplete`, { orgId: orgId });
  }
  addAutocomplete(obj) {
    return this.http.post<any>(`${this._baseURL}/autocomplete/add`, obj);
  }
  getAllAutocompleteData(tabID) {
    return this.http.post<any>(`${this._baseURL}/autocomplete/get/selected`, { tabID: tabID });
  }
  getAllField(orgId) {
    return this.http.post<any>(`${this._baseURL}/lessons/lessonfield`, { orgId: orgId });
  }
  getAllAutocompleteAllData() {
    return this.http.get<any>(`${this._baseURL}/autocomplete/element`);
  }
  saveLesson(obj) {
    return this.http.post<any>(`${this._baseURL}/lessons/add`, obj);
  }
  getAllLesson(orgId) {
    return this.http.post<any>(`${this._baseURL}/lessons`, { orgId: orgId });
  }
  getAlldatabaseforms(orgId) {
    return this.http.post<any>(`${this._baseURL}/lessons/alllessonfield`, { orgId: orgId });
  }
  updateViewDatabaseForm(obj) {
    let id = obj.LessonFiedID;
    return this.http.post<any>(`${this._baseURL}/lessons/updatelessonfield/` + id, obj);
  }
  deleteViewDatabase(id) {
    return this.http.post<any>(`${this._baseURL}/lessons/deletelessonfield/delete`, { _id: id });
  }
  getAllAutocompleteField(lfId, orgId) {
    return this.http.post<any>(`${this._baseURL}/autocomplete/getfield`, { lfId: lfId, orgId: orgId });
  }
  getAllAutocompleteParentData(tabID) {
    return this.http.post<any>(`${this._baseURL}/autocomplete/get/selected/parent`, { tabID: tabID });
  }
  getParentAutocompleteById(lfID) {
    return this.http.post<any>(`${this._baseURL}/autocomplete/get/field/parent`, { lfID: lfID });
  }
  getAllAutocompleteParentDataAndField(plfId, lfID) {
    return this.http.post<any>(`${this._baseURL}/autocomplete/get/field/and/parent`, { plfId: plfId, lfID: lfID });
  }
  getAllAutocompleteParentField(plfId) {
    return this.http.post<any>(`${this._baseURL}/autocomplete/get/parent`, { plfId: plfId });
  }
  saveAttachment(attachment) {
    return this.http.post<any>(`${this._baseURL}/lessons/add/attachment`, attachment);
  }
  updatemasterlistlabel(obj) {
    let id = obj._id;
    return this.http.post<any>(`${this._baseURL}/autocomplete/updatemasterlistlessonfield/` + id, obj);
  }
  getAllDatabaseFormForProject(orgId) {
    return this.http.post<any>(`${this._baseURL}/lessons/alllessonfieldforproject`, { orgId: orgId });
  }
  getAllDatabaseFormForProcess(orgId) {

    return this.http.post<any>(`${this._baseURL}/lessons/alllessonfieldforprocess`, { orgId: orgId });
  }
  getallautocompleteforproject(orgId) {
    return this.http.post<any>(`${this._baseURL}/autocomplete/autocompleteforproject`, { orgId: orgId });
  }
  getallautocompleteforprocess(orgId) {
    return this.http.post<any>(`${this._baseURL}/autocomplete/autocompleteforprocess`, { orgId: orgId });
  }
  getAllAutocompleteDataforprocess(tabID) {
    return this.http.post<any>(`${this._baseURL}/autocomplete/get/selectedforprocess`, { tabID: tabID });
  }
  getlessonbyID(lessonID) {
    return this.http.post<any>(`${this._baseURL}/lessons/lessonbyid`, { lessonID: lessonID });
  }
  updateLessonDatas(obj) {
    return this.http.post<any>(`${this._baseURL}/lessons/updatelessonfieldcheckbox`, obj);
  }

  updateLessondatasLabel(obj) {
    return this.http.post<any>(`${this._baseURL}/lessons/updatelessonfieldLabel`, obj);
  }
  updatelessondatasvalue(obj) {
    return this.http.post<any>(`${this._baseURL}/lessons/updatelessondatasvalueformasterlist`, obj);
  }
  updateLesson(obj) {
    return this.http.post<any>(`${this._baseURL}/lessons/update`, obj);
  }
  updateCheckboxLessonField(obj) {
    return this.http.post<any>(`${this._baseURL}/lessons/updatecheckboxlessonfield`, obj);
  }
}
