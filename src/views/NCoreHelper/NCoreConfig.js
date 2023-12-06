export default {
  // Endpoints
  loginEndpoint: '/Login/login',
  registerEndpoint: '/jwt/register',
  refreshEndpoint: '/Login/refresh-token',
  logoutEndpoint: '/jwt/logout',
  accountInfo: 'account/accountInfo',

  // This will be prefixed in authorization header with token
  // e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',
  userData: 'userData',
  projectData: 'projectData',
  // Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken',
  storageUserName: 'storageUserName',
  storagePassWord: 'storagePassWord',
  storageMenuRole: 'menuRoles',
  localAddNew: 'Thêm mới',
  localUpdate: 'Cập nhật',
  localDelete: 'Xóa',
  localSuccess: 'thành công',
  localFail: 'thất bại',
  menuItems: 'menuItems',
  dashboardDefault: 'dashboard-default',
  isAlreadyFetchingAccessToken: false,
  isGuidEmpty: '00000000-0000-0000-0000-000000000000',
  markDesignlessonLoadOne: 'markDesignlessonLoadOne',
  markDesignlesson: 'markDesignlesson',
  folderRoot: 'folderRoot',
  SGD: 'C3FD75EA-C67A-42D6-AB09-5E5510D91BF1',
  emptyImage: '/assets/img/avatar/avatar.png',
  localDataHidden: 'localDataHidden',
  localProjectId: 'localProjectId',
  localProjectName: 'localProjectName',
  localSystem: 'localSystem',
  localErrMess: 'localErrMess',
  localErrMessAuthority: 'Bạn không có quyền truy cập chức năng này',
  localLogContent: 'localLogContent',
  localLogContentQuestion: 'localLogContentQuestion',
  localLogNewsGroupTypeContent: 'localLogNewsGroupTypeContent',
  projectAuthorities_NoCheck: 0,
  projectAuthorities_Add: 1,
  projectAuthorities_Edit: 2,
  projectAuthorities_Delete: 3,
  projectActiveData: 3,
  authority_Add: 2,
  authority_Edit: 4,
  authority_Delete: 8,
  authority_ViewAll: 32,//Xem tất cả
  authority_ExportFile: 256,// Xuất file
  authority_ImportFile: 512,// Nhập file
  authority_ViewDetail: 1024,// Xem chi tiết
  authority_EditDetail: 2048,// Cập nhật chi tiết
  combobox_all: '0',
  combobox_select: '-1',
  uncheckedValue: 'not_accepted',
  checkedValue: 'accepted',
  noDataTemplate: '<b-row style="max-width: 100%;">\n' +
    '        <b-col xs="12" sm="12" md="12" lg="12" class="text-center">\n' +
    '          <img src="/assets/img/avatar/nodata.gif" class="img_nodata_template" loading="lazy" style="width: 30%;max-width: 30%" alt="Không có dữ liệu được tìm thấy"/>\n' +
    '        </b-col>\n' +
    '        <b-col xs="12" sm="12" md="12" lg="12" class="nFontButton text-center" style="font-size: 18px;font-weight: 700;color: red;">\n' +
    '          <br/>KHÔNG CÓ DỮ LIỆU ĐƯỢC TÌM THẤY\n' +
    '        </b-col>\n' +
    '      </b-row>',
  noDataTemplateModal: '<b-row style="max-width: 100%;">\n' +
    '        <b-col xs="12" sm="12" md="12" lg="12" class="text-center">\n' +
    '          <img src="/assets/img/avatar/nodata.gif" class="img_nodata_template" loading="lazy" style="width: 30%;max-width: 50%" alt="Không có dữ liệu được tìm thấy"/>\n' +
    '        </b-col>\n' +
    '        <b-col xs="12" sm="12" md="12" lg="12" class="nFontButton text-center" style="font-size: 18px;font-weight: 700;color: red;">\n' +
    '          <br/>KHÔNG CÓ DỮ LIỆU ĐƯỢC TÌM THẤY\n' +
    '        </b-col>\n' +
    '      </b-row>',
  loadingTemplate: '<b-row style="max-width: 100%;">\n' +
    '        <b-col xs="12" sm="12" md="12" lg="12" class="text-center">\n' +
    '          <img src="/images/loading_page.png" class="img_nodata_template" loading="lazy" style="max-width: 75%" alt="Đang xử lý dữ liệu"/>\n' +
    '        </b-col>\n' +
    '        <b-col xs="12" sm="12" md="12" lg="12" class="nFontButton text-center" style="font-size: 18px;font-weight: 700;color: red;">\n' +
    '          <br/>ĐANG XỬ LÝ DỮ LIỆU ...\n' +
    '        </b-col>\n' +
    '      </b-row>',
  tableNoDataTemplate: '<b-row style="max-width: 100%;">\n' +
    '        <b-col xs="12" sm="12" md="12" lg="12" class="text-center">\n' +
    '          <img src="/images/library/emptyData.png" class="img_nodata_template" loading="lazy" style="max-width: 100%" alt="Không có dữ liê"/>\n' +
    '        </b-col>\n' +
    '        <b-col xs="12" sm="12" md="12" lg="12" class="nFontButton text-center" style="font-size: 18px;font-weight: 700;color: red;">\n' +
    '          <br/>Không có dữ liệu \n' +
    '        </b-col>\n' +
    '      </b-row>',
  base64Default: 'data:image/png;base64,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',
  avatarDefault: '/images/avatar.png',
}
