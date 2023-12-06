import { axiosApiInstance } from "./axiosApiInstance";
// import moment from "moment";
import NCoreConfig from "./NCoreConfig";

export const formatDateToDDMMYYYY = (value) => {
  if (!value) return "";
  //return moment(String(value)).format("DD/MM/YYYY");
};
export default {
  // Trả về danh sách combobox với cấu trúc đã được quy ước
  gerenalStatusCombobox(val, isShowTitleHeader, message, isNoHeader) {
    let data = [];
    if (isNoHeader === true) {
    } else {
      if (isShowTitleHeader) {
        data.push({
          id: "0",
          title: message,
        });
      }
    }
    for (let i = 0; i < val.length; i++) {
      data.push({
        id: val[i].id,
        title: val[i].name,
      });
    }
    return data;
  },
  async excuteViewFile(vm, url, data) {
    return await axiosApiInstance({
      url: url + "/" + data, // your url
      method: "GET",
      responseType: "blob", // important
      // params: { submitReportId: id, reportFormat: 'PDF' },
    })
      .then((response) => {
        if (response.status === 200) {
          return window.URL.createObjectURL(new Blob([response.data]));
        }
        return false;
      })
      .catch((error) => {
        this.fucError(error);
        return false;
      });
  },
  async excuteDowloadFile(vm, url, dataSend) {
    return await axiosApiInstance({
      url: url, // your url
      method: "GET",
      responseType: "blob", // important
      params: dataSend,
    })
      .then((response) => {
        if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", dataSend.nameFile); // or any other extension
          document.body.appendChild(link);
          link.click();
          return true;
        }

        localStorage.setItem(
          NCoreConfig.localErrMess,
          `${response.data?.errors[0]}`
        );
        return false;
      })
      .catch((error) => {
        this.fucError(error);
        return false;
      });
  },
  async uploadFile(vm, url, model) {
    const formData = new FormData();
    formData.append("IsSecure", model.isSecure);
    formData.append("formFile", model.files);
    // if (model.IsBackground) { formData.append('IsBackground ', model.IsBackground) }
    if (model.fileType) formData.append("FileType", model.fileType);
    // const userData = JSON.parse(localStorage.getItem('userData'))
    // if (userData) formData.append('UserId', userData.userId)
    const iResult = await axiosApiInstance
      .post(url, formData)
      .then((response) => {
        return response.data.data;
      })
      // eslint-disable-next-line no-shadow
      .catch((error) => {
        const iRes = error.response.data;
        if (iRes !== null || true) {
          this.alertMess(vm, error.response.data?.errors[0], 1);
        } else {
          this.alertMess(vm, error.message, 1);
        }
        return false;
      });
    return iResult;
  },
  async uploadProofFile(vm, url, model) {
    const iResult = await axiosApiInstance
      .post(url, model)
      .then((response) => {
        return response.data.data;
      })
      // eslint-disable-next-line no-shadow
      .catch((error) => {
        const iRes = error.response.data;
        if (iRes !== null || true) {
          this.alertMess(vm, error.response.data?.errors[0], 1);
        } else {
          this.alertMess(vm, error.message, 1);
        }
        return false;
      });
    return iResult;
  },
  fucError(error) {
    try {
      switch (error.response.status) {
        case 500: {
          localStorage.setItem(
            NCoreConfig.localErrMess,
            "Lỗi chưa xử lý từ server: 500"
          );
          break;
        }
        case 415: {
          localStorage.setItem(
            NCoreConfig.localErrMess,
            "Lỗi 415: Phương thức không hỗ trợ"
          );
          break;
        }
        case 403: {
          localStorage.setItem(
            NCoreConfig.localErrMess,
            "Bạn không có quyền truy cập chức năng này"
          );
          break;
        }
        case 400: {
          localStorage.setItem(
            NCoreConfig.localErrMess,
            error.response.data.errors[0]
          );
          break;
        }
        default: {
          const iRes = error.response.data;
          if (iRes !== null || true) {
            localStorage.setItem(
              NCoreConfig.localErrMess,
              iRes.errors[0] === undefined ? iRes.title : iRes.errors[0]
            );
          } else {
            localStorage.setItem(NCoreConfig.localErrMess, error.message);
          }
          break;
        }
      }
    } catch (e) {
      if (error === "Error: Network Error") {
        localStorage.setItem(
          NCoreConfig.localErrMess,
          "Không có kết nối internet - Vui lòng kiểm tra lại hệ thống mạng"
        );
      } else {
        localStorage.setItem(
          NCoreConfig.localErrMess,
          "Mất kết nối máy chủ: " + error
        );
      }
    }
  },
  v2alertMess(vm, val, type) {
    const iTitle = "Thông báo hệ thống";
    switch (type) {
      case 1: {
        //Error
        vm.$notify("error", iTitle, val, {
          duration: 3000,
          permanent: false,
        });
        break;
      }
      case 3: {
        //Error show from localStore
        let iMess = localStorage.getItem(NCoreConfig.localErrMess);
        iMess =
          iMess === "undefined"
            ? "Lỗi chưa xử lý ! Vui lòng liên hệ ADMIN"
            : iMess;
        vm.$notify("error", iTitle, iMess, {
          duration: 3000,
          permanent: false,
        });
        break;
      }
      case 2: {
        //Error
        vm.$notify("success", iTitle, val, {
          duration: 3000,
          permanent: false,
        });
        break;
      }
    }
    vm.$hideProcessing();
  },
  v2alertMessSweet_Question(vm, mess, typeId) {
    let icons = "";
    switch (typeId) {
      case 1: {
        icons = "error";
        break;
      }
      case 2: {
        icons = "warning";
        break;
      }
      case 3: {
        icons = "info";
        break;
      }
      case 4: {
        icons = "question";
        break;
      }
      default: {
        icons = "success";
        break;
      }
    }
    return vm.$swal.fire({
      title: "Thông báo",
      text: mess,
      icon: icons,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Không đồng ý",
    });
  },
  v2modalShowHide(vm, val, OneShow) {
    console.log("vm", vm)
    switch (OneShow) {
      case 0: {
        vm.$bvModal.hide(val);
        break;
      }
      default: {
        vm.$bvModal.show(val);
        break;
      }
    }
  },
  async v2executeGET(vm, url, data) {
    return await axiosApiInstance
      .get(url, { params: data })
      .then((response) => {
        if (response.data.code === 200) {
          return response.data.data;
        }
        localStorage.setItem(
          NCoreConfig.localErrMess,
          `${response.data?.errors[0]}`
        );
        return false;
      })
      // eslint-disable-next-line no-shadow
      .catch((error) => {
        this.fucError(error);
        return false;
      });
  },
  async v2executeGETFormBody(vm, url, data) {
    return await axiosApiInstance
      .get(url, data)
      .then((response) => {
        if (response.data.code === 200) {
          return response.data.data;
        }
        localStorage.setItem(
          NCoreConfig.localErrMess,
          `${response.data?.errors[0]}`
        );
        return false;
      })
      // eslint-disable-next-line no-shadow
      .catch((error) => {
        this.fucError(error);
        return false;
      });
  },
  async v2executeGETById(vm, url, data) {
    return await axiosApiInstance
      .get(url + "/" + data)
      .then((response) => {
        if (response.data.code === 200) {
          return response.data.data;
        }
        localStorage.setItem(
          NCoreConfig.localErrMess,
          `${response.data?.errors[0]}`
        );
        return false;
      })
      // eslint-disable-next-line no-shadow
      .catch((error) => {
        this.fucError(error);
        return false;
      });
  },
  async v2checkAuthorities(authorityName) {
    const token = localStorage.getItem(NCoreConfig.storageTokenKeyName);

    function parseJwt(token) {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
          .join("")
      );
      return JSON.parse(jsonPayload);
    }

    if (token) {
      const tokenData = parseJwt(token);
      switch (authorityName) {
        case "AuthorityManager": {
          return Number(tokenData.AuthorityManager);
        }
        case "WorkManager": {
          return Number(tokenData.WorkManager);
        }
        case "NewsGroup": {
          return Number(tokenData.NewsGroup);
        }
        case "NewsGroupType": {
          return Number(tokenData.NewsGroupType);
        }
        case "NewsContent": {
          return Number(tokenData.NewsContent);
        }
        case "HomeMenu": {
          return Number(tokenData.HomeMenu);
        }
        case "StaffId": {
          return tokenData.StaffId;
        }
        case "StaffName": {
          return tokenData.StaffName;
        }
        case "StaffProjectId": {
          return tokenData.StaffProjectId;
        }
        case "StaffProjectName": {
          return tokenData.StaffProjectName;
        }
        case "StaffManagementId": {
          return tokenData.StaffManagementId;
        }
        case "StaffManagementName": {
          return tokenData.StaffManagementName;
        }
        case "StaffLevelCompetition": {
          return Number(tokenData.StaffLevelCompetition);
        }
        case "NewsSeoKeyWord": {
          return Number(tokenData.NewsSeoKeyWord);
        }
        case "ServerFileManager": {
          return Number(tokenData.ServerFileManager);
        }
        case "HomeNewsGroupView": {
          return Number(tokenData.HomeNewsGroupView);
        }
        case "SubjectManager": {
          return Number(tokenData.SubjectManager);
        }
        case "SubjectTypeManager": {
          return Number(tokenData.SubjectTypeManager);
        }
        case "QuestionManager": {
          return Number(tokenData.QuestionManager);
        }
        case "UserTypeManager": {
          return Number(tokenData.UserTypeManager);
        }
        case "UserManager": {
          return Number(tokenData.UserManager);
        }
        case "NotificationManager": {
          return Number(tokenData.NotificationManager);
        }
        case "PositionManager": {
          return Number(tokenData.PositionManager);
        }
        case "MissionManager": {
          return Number(tokenData.MissionManager);
        }
        case "SportSubjectTypeManager": {
          return Number(tokenData.SportSubjectTypeManager);
        }
        case "SportSubjectManager": {
          return Number(tokenData.SportSubjectManager);
        }
        case "ProjectManager": {
          return Number(tokenData.ProjectManager);
        }
        case "ManagementManager": {
          return Number(tokenData.ManagementManager);
        }
        case "ProjectAccountManager": {
          return Number(tokenData.ProjectAccountManager);
        }
        case "Athletes": {
          return Number(tokenData.Athletes);
        }
        case "TeamLeader": {
          return Number(tokenData.TeamLeader);
        }
        case "AuthorityAllSystemManager": {
          return Number(tokenData.AuthorityAllSystemManager);
        }
        case "SportSubmitDocument": {
          return Number(tokenData.SportSubmitDocument);
        }
        case "ScheduleManager": {
          return Number(tokenData.ScheduleManager);
        }
        case "SchoolYearManager": {
          return Number(tokenData.SchoolYearManager);
        }
        case "TrainingSystemManager": {
          return Number(tokenData.TrainingSystemManager);
        }
        case "FormsOfTrainingManager": {
          return Number(tokenData.FormsOfTrainingManager);
        }
        case "ViewDegreeManager": {
          return Number(tokenData.ViewDegreeManager);
        }
        case "ViewDegreeDetailManager": {
          return Number(tokenData.ViewDegreeDetailManager);
        }
        case "SaleProductTypeManager": {
          return Number(tokenData.SaleProductTypeManager);
        }
        case "SaleProductManager": {
          return Number(tokenData.SaleProductManager);
        }
        case "AboutManager": {
          return Number(tokenData.AboutManager);
        }
        case "ContactManager": {
          return Number(tokenData.ContactManager);
        }
        case "PartnerManager": {
          return Number(tokenData.PartnerManager);
        }
        case "SlideManager": {
          return Number(tokenData.SlideManager);
        }
        case "QuestionAskManager": {
          return Number(tokenData.QuestionAskManager);
        }
        case "NewsRecruitment": {
          return Number(tokenData.NewsRecruitment);
        }
        case "NewsRecruitmentQuote": {
          return Number(tokenData.NewsRecruitmentQuote);
        }
        case "HealthHandbookManager": {
          return Number(tokenData.HealthHandbookManager);
        }
        case "ImageLibraryManager": {
          return Number(tokenData.ImageLibraryManager);
        }
        case "MinusWord": {
          return Number(tokenData.MinusWord);
        }
        case "NewsVia": {
          return Number(tokenData.NewsVia);
        }
        case "NewsGithub": {
          return Number(tokenData.NewsGithub);
        }
      }
    }
  },
  async v2executePOST(vm, url, data) {
    return await axiosApiInstance
      .post(url, data)
      .then((res) => {
        if (res.data.code === 200) {
          return res.data.data;
        }
        localStorage.setItem(
          NCoreConfig.localErrMess,
          `${res.data?.errors[0]}`
        );
        return false;
      })
      .catch((error) => {
        this.fucError(error);
        return false;
      });
  },
  async v2executePUT(vm, url, data) {
    return await axiosApiInstance
      .put(url, data)
      .then((res) => {
        if (res.data.code === 200) {
          return true;
        }

        localStorage.setItem(
          NCoreConfig.localErrMess,
          `${res.data?.errors[0]}`
        );
        return false;
      })
      .catch((error) => {
        this.fucError(error);
        return false;
      });
  },
  async v2executePATCH(vm, url, data) {
    return await axiosApiInstance
      .patch(url, data)
      .then((res) => {
        if (res.data.code === 200) {
          return true;
        }

        localStorage.setItem(
          NCoreConfig.localErrMess,
          `${res.data?.errors[0]}`
        );
        return false;
      })
      .catch((error) => {
        this.fucError(error);
        return false;
      });
  },
  async v2executeDELETE(vm, url, data) {
    return await axiosApiInstance
      .delete(url, { params: data })
      .then((res) => {
        if (res.data.code === 200) {
          return true;
        }
        localStorage.setItem(
          NCoreConfig.localErrMess,
          `${res.data?.errors[0]}`
        );
        return false;
      })
      .catch((error) => {
        this.fucError(error);
        return false;
      });
  },
  async v2executeDownloadFile(vm, url, dataSend) {
    return await axiosApiInstance({
      url: url, // your url
      method: "GET",
      responseType: "blob", // important
      params: dataSend,
    })
      .then((response) => {
        if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", dataSend.nameFile); // or any other extension
          document.body.appendChild(link);
          link.click();
          return true;
        }
        localStorage.setItem(
          NCoreConfig.localErrMess,
          `${res.data?.errors[0]}`
        );
        return false;
      })
      .catch((error) => {
        this.fucError(error);
        return false;
      });
  },
  async v2uploadFile(vm, url, formData) {
    return await axiosApiInstance
      .post(url, formData)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        this.fucError(error);
        return false;
      });
  },
  async v2uploadProofFile(vm, url, model) {
    return await axiosApiInstance
      .post(url, model)
      .then((response) => {
        return response.data.data;
      })
      // eslint-disable-next-line no-shadow
      .catch((error) => {
        this.fucError(error);
        return false;
      });
  },
  async v2executeViewFile(vm, url, data) {
    if (data === NCoreConfig.isGuidEmpty) return "/images/avatar.png";
    return await axiosApiInstance({
      url: url + "/" + data, // your url
      method: "GET",
      responseType: "blob", // important
      // params: { submitReportId: id, reportFormat: 'PDF' },
    })
      .then((response) => {
        if (response.status === 200) {
          return window.URL.createObjectURL(new Blob([response.data]));
        }
        return false;
      })
      .catch((error) => {
        this.fucError(error);
        return false;
      });
  },
  async v2executeViewFileDifference(vm, url, data) {
    if (data === NCoreConfig.isGuidEmpty) return "/images/avatar.png";
    return await axiosApiInstance
      .get(url + "/" + data)
      .then((response) => {
        return response.data;
      })
      // eslint-disable-next-line no-shadow
      .catch((error) => {
        this.fucError(error);
        return false;
      });
  },
  async v2executeViewFileAll(vm, url, data) {
    return await axiosApiInstance({
      url: url + "/" + data, // your url
      method: "GET",
      responseType: "blob", // important
    })
      .then((response) => {
        if (response.status === 200) {
          return window.URL.createObjectURL(new Blob([response.data]));
        }
        return false;
      })
      .catch((error) => {
        this.fucError(error);
        return false;
      });
  },

  returnUpperCase(val) {
    if (val === null) return "";
    if (val === undefined) return "";
    if (val === "") return "";
    return val.toUpperCase();
  },
  GetThumbnail(
    isFolder,
    fileExtension,
    filePath,
    size,
    serverFile,
    isLocal = true
  ) {
    if (isFolder) {
      // eslint-disable-next-line global-require
      return require("@/assets/images/illustration/folder.png");
    }
    switch (fileExtension) {
      case ".doc":
      case ".docx":
        // eslint-disable-next-line global-require
        return require("@/assets/images/illustration/doc.svg");
      case ".ppt":
      case ".pptx":
        // eslint-disable-next-line global-require
        return require("@/assets/images/illustration/ppt.svg");
      case ".xls":
      case ".xlsx":
        // eslint-disable-next-line global-require
        return require("@/assets/images/illustration/xls.svg");
      case ".pdf":
        // eslint-disable-next-line global-require
        return require("@/assets/images/illustration/pdf.svg");
      case ".mp3":
        // eslint-disable-next-line global-require
        return require("@/assets/images/illustration/mp3.svg");
      case ".mp4":
        // eslint-disable-next-line global-require
        return require("@/assets/images/illustration/mp4.svg");
      case ".txt":
        // eslint-disable-next-line global-require
        return require("@/assets/images/illustration/txt.svg");
      case ".jpg":
        if (isLocal) {
          if (filePath) {
            const imageUrl = this.GetSmallImage(filePath, size, serverFile);
            if (imageUrl !== "") return imageUrl;
          }
          // eslint-disable-next-line global-require
          return require("@/assets/images/illustration/jpg.svg");
        }
        return filePath;
      case ".png":
        if (isLocal) {
          if (filePath) {
            const imageUrl = this.GetSmallImage(filePath, size, serverFile);
            if (imageUrl !== "") return imageUrl;
          }
          // eslint-disable-next-line global-require
          return require("@/assets/images/illustration/png.svg");
        }
        return filePath;
      case ".zip":
        // eslint-disable-next-line global-require
        return require("@/assets/images/illustration/zip.svg");
      default:
        // eslint-disable-next-line global-require
        return require("@/assets/images/illustration/other.svg");
    }
  },
  GetExtendSion(url) {
    const cut = url.split(".");
    return cut[cut.length - 1];
  },
  GetSmallImage(imageUrl, size, serverFile) {
    if (imageUrl === null) return "";
    if (imageUrl === "") return "";
    if (imageUrl === undefined) return "";
    const arr1 = imageUrl.split("\\");
    const fileName = arr1[arr1.length - 1];
    const arr2 = fileName.split(".");
    if (arr2.length === 2) {
      arr1[arr1.length - 1] = `${size}.${arr2[1]}`;
      return serverFile + arr1.join("\\");
    }
    return "";
  },
  CreateGuid() {
    function _p8(s) {
      let p = (Math.random().toString(16) + "000000000").substr(2, 8);
      return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }

    return _p8() + _p8(true) + _p8(true) + _p8();
  },
  ConvertStringToDateTime(val) {
    const cut = val.split("-");
    return cut[2].trim() + "-" + cut[1].trim() + "-" + cut[0].trim();
  },
  ConvertDateTimeToString(val) {
    const cut1 = val.split("T");
    const cut = cut1[0].split("-");
    return cut[2].trim() + "-" + cut[1].trim() + "-" + cut[0].trim();
  },
  ConvertStringToDateTimeCanBoDoan(val) {
    const cut = val.split("-");
    if (cut[0].length === 4) {
      return cut[0].trim() + "-" + cut[1].trim() + "-" + cut[2].trim();
    }
    return cut[2].trim() + "-" + cut[1].trim() + "-" + cut[0].trim();
  },
  ConvertStringToYear(val) {
    const cut = val.split("-");
    if (cut.length === 1) {
      return val + "-01-01";
    }
    if (cut.length === 4) {
      return cut[0].trim() + "-" + cut[1].trim() + "-" + cut[2].trim();
    }
    return cut[2].trim() + "-" + cut[1].trim() + "-" + cut[0].trim();
  },
  ConvertStringToYearFromDb(val) {
    const cut1 = val.split("T");
    const cut = cut1[0].split("-");
    if (cut.length === 4) {
      return cut[2].trim(); //+ '-' + cut[1].trim() + '-' + cut[0].trim()
    }
    return cut[0].trim(); //cut[0].trim() + '-' + cut[1].trim() + '-' + cut[2].trim()
  },
  ConvertStringToTime(val) {
    return val;
    // return moment().format("yyyy-MM-DD") + ' ' + val
  },
  ConvertDateTimeToStringTCanBoDoan(val) {
    const cut1 = val.split("T");
    const cut = cut1[0].split("-");
    if (cut[0].length === 4) {
      return cut[2].trim() + "-" + cut[1].trim() + "-" + cut[0].trim();
    }
    return cut[0].trim() + "-" + cut[1].trim() + "-" + cut[2].trim();
  },
  ConvertDateTimeFromDatabaseToString(val) {
    if (val === null) return "-";
    if (val === "") return "-";
    if (val === undefined) return "-";

    const cut1 = val.split("T");
    const cutDay = cut1[0].split("-");
    const cutTime = cut1[1].split(":");

    return (
      cutDay[0].trim() +
      "/" +
      cutDay[1].trim() +
      "/" +
      cutDay[2].trim() +
      " " +
      cutTime[0].trim() +
      ":" +
      cutTime[1].trim()
    );
  },
  ConvertDateTimeFromDatabaseToStringV2022_06_21(val) {
    if (val === null) return "-";
    if (val === "") return "-";
    if (val === undefined) return "-";

    const cut1 = val.split(" ");
    const cutDay = cut1[0].split("/");
    const cutTime = cut1[1].split(":");

    return (
      cutDay[2].trim() + " - " + cutDay[1].trim() + " - " + cutDay[0].trim()
    ); // + " " + cutTime[0].trim() + ":" + cutTime[1].trim()
  },
  ConvertStringToFloat(value) {
    return parseFloat(value.toString().replace(/,/g, ""));
  },
  openFullOrCloseTreeView(val, data) {
    const iOpen = val === 1;
    for (let i = 0; i < data.length; i++) {
      this.openFullOrCloseDetail(data[i], iOpen);
    }
  },
  openFullOrCloseDetail(data, val) {
    if (data.children != null) {
      for (let i = 0; i < data.children.length; i++) {
        this.openFullOrCloseDetail(data.children[i], val);
      }
    }
    data.opened = val;
  },
  returnMessage(flagFunc, isSuccess, funcName) {
    switch (flagFunc) {
      case 1:
        // Thêm mới
        if (isSuccess) {
          return "Thêm mới " + funcName + " thành công";
        } else {
          return "Thêm mới " + funcName + " thất bại";
        }
      case 2:
        // Cập nhật
        if (isSuccess) {
          return "Cập nhật " + funcName + " thành công";
        } else {
          return "Cập nhật " + funcName + " thất bại";
        }
      case 3:
        // Xóa
        if (isSuccess) {
          return "Xóa " + funcName + " thành công";
        } else {
          return "Xóa " + funcName + " thất bại";
        }
      default:
        break;
    }
  },
  returnStatusView(statusId, statusName) {
    // <b-badge className="mb-1" pill variant="primary">{{$t('badge.primary')}}</b-badge>
    // <b-badge className="mb-1" pill variant="secondary">{{$t('badge.secondary')}}</b-badge>
    // <b-badge className="mb-1" pill variant="success">{{$t('badge.success')}}</b-badge>
    // <b-badge className="mb-1" pill variant="danger">{{$t('badge.danger')}}</b-badge>
    // <b-badge className="mb-1" pill variant="warning">{{$t('badge.warning')}}</b-badge>
    // <b-badge className="mb-1" pill variant="info">{{$t('badge.info')}}</b-badge>
    // <b-badge className="mb-1" pill variant="light">{{$t('badge.light')}}</b-badge>
    // <b-badge className="mb-1" pill variant="dark">{{$t('badge.dark')}}</b-badge>
    let iVariant = "";
    switch (statusId) {
      case 1: {
        // Tạm khóa
        iVariant = "warning";
        break;
      }
      case 2: {
        // Chờ duyệt
        iVariant = "primary";
        break;
      }
      case 3: {
        // Thành công
        // Hoạt động
        iVariant = "success";
        break;
      }
    }
    return (
      '<b-badge pill variant="' + iVariant + '">' + statusName + "</b-badge>"
    );
  },
  returnNewsContentTypeName(val) {
    switch (val) {
      case 1: {
        return "Hình ảnh";
      }
      case 2: {
        return "Bài viết";
      }
      case 3: {
        return "Slide hình ảnh";
      }
      case 4: {
        return "Ghi chú";
      }
      case 5: {
        return "File đính kèm";
      }
      case 6: {
        return "Video";
      }
    }
  },
  returnNoDataTemplate(message) {
    return (
      '<b-row style="max-width: 100%;">\n' +
      '        <b-col xs="12" sm="12" md="12" lg="12" class="text-center">\n' +
      '          <img src="/assets/img/avatar/nodata.gif" class="img_nodata_template" loading="lazy" style="width: 30%;max-width: 50%" alt="Không có dữ liệu được tìm thấy"/>\n' +
      "        </b-col>\n" +
      '        <b-col xs="12" sm="12" md="12" lg="12" class="nFontButton text-center" style="font-size: 18px;font-weight: 700;color: red;">\n' +
      "          <br/>" +
      message.toUpperCase() +
      "\n" +
      "        </b-col>\n" +
      "      </b-row>"
    );
  },
  returnABC(vValue) {
    switch (vValue) {
      case 1: {
        return "A";
      }
      case 2: {
        return "B";
      }
      case 3: {
        return "C";
      }
      case 4: {
        return "D";
      }
      case 5: {
        return "E";
      }
      case 6: {
        return "F";
      }
      case 7: {
        return "G";
      }
      case 8: {
        return "H";
      }
      case 9: {
        return "I";
      }
      case 10: {
        return "J";
      }
      case 11: {
        return "K";
      }
      case 12: {
        return "L";
      }
      case 13: {
        return "M";
      }
      case 14: {
        return "N";
      }
      case 15: {
        return "O";
      }
      case 16: {
        return "P";
      }
    }
  },
  returnStringDateTime() {
    return Date.now();
    // const iDateTimeNow = moment().format("l");
    // const iCut = iDateTimeNow.split("/"); // 17/5/2022
    // const iDate = parseInt(iCut[0]) < 10 ? "0" + parseInt(iCut[0]) : iCut[0];
    // const iMont = parseInt(iCut[1]) < 10 ? "0" + parseInt(iCut[1]) : iCut[1];
    // const iHour = moment().format('LT').split(":");
    // return iDate + "" + iMont + "" + iCut[2] + "" + iHour[0] + "" + iHour[1];
  },
  returnDeadLine() {
    // const iDateTimeNow = moment().format("l");
    // const iCut = iDateTimeNow.split("/"); // 17/5/2022
    // const iDate = parseInt(iCut[0]) < 10 ? "0" + parseInt(iCut[0]) : iCut[0];
    // const iMont = parseInt(iCut[1]) < 10 ? "0" + parseInt(iCut[1]) : iCut[1];
    // const iHour = moment().format('LT');
    // return iDate + " - " + iMont + " - " + iCut[2] + " " + iHour;
  },
  returnCreateNews() {
    const now = new Date();

    const day = now.getDate().toString().padStart(2, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const year = now.getFullYear();

    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");

    const formattedDateTime = `${day} - ${month} - ${year} ${hours}:${minutes}`;

    return formattedDateTime;
  },
  returnFileExtension(vValue) {
    const iCut = vValue.split(".");
    if (iCut.length === 1) return 0;
    switch (iCut[iCut.length - 1]) {
      case "pdf": {
        return 1;
      }
      default: {
        return 0;
      }
    }
  },
  returnlevel(vData) {
    switch (vData) {
      case 1: {
        return "Tiểu học";
      }
      case 2: {
        return "THCS";
      }
      case 3: {
        return "THPT";
      }
    }
  },
  returnSex(vData) {
    switch (vData) {
      case 1: {
        return "Nam";
      }
      case 0: {
        return "Nữ";
      }
    }
  },
  returnSortWithPosition(vData, flag, vDataRoot) {
    const iPositionNow = flag === 1 ? vData.position - 1 : vData.position + 1;
    if (flag === 1) {
      //===Tăng lên===> Tìm vị trí phía trên cần thay thế
      const iPosition = vDataRoot.find(
        (o) => o.position === vData.position - 1
      );
      vDataRoot.find((o) => o.id === iPosition.id).position = iPositionNow + 1;
    } else {
      //===Giảm xuống===> Tìm vị trí phía dưới cần thay thế
      const iPosition = vDataRoot.find(
        (o) => o.position === vData.position + 1
      );
      vDataRoot.find((o) => o.id === iPosition.id).position = iPositionNow - 1;
    }
    vDataRoot.find((o) => o.id === vData.id).position = iPositionNow;
    return vDataRoot;
  },
  returnModalAvatar(url, isLocal, baseUrl) {
    if (!isLocal) return url;
    url.replace("\\", "/");
    return baseUrl + "" + url;
  },
  returnModalAvatarV2023(url, urlLocal, isLocal, baseUrl) {
    if (!isLocal) return urlLocal;
    url.replace("\\", "/");
    return baseUrl + "" + url;
  },
  returnRemoveVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, " ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(
      /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
      " "
    );
    const iCut = str.split(" ");
    let iReturn = "";
    for (let i = 0; i < iCut.length; i++) {
      if (iCut[i] !== "") {
        if (iReturn === "") iReturn = iCut[i].toLocaleLowerCase();
        else iReturn = iReturn + "-" + iCut[i].toLocaleLowerCase();
      }
    }
    return iReturn;
  },
  returnRandom() {
    return Math.random().toString(36).slice(2);
  },
};
