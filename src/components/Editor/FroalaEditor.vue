<template>
  <froala :id="froalaEditorId"
          :tag="'textarea'"
          :config="config"
          v-model="sendData"></froala>
</template>

<script>
export default {
  name: "FroalaEditor",
  props: ['sendData', 'froalaEditorId'],
  data() {
    return {
      imageAvatarTemp: '',
      imageAvatar: '',
      config: {
        imageMaxSize: 5 * 1024 * 1024,
        // pastePlain: true,
        imagePaste: true, // Enable image paste
        imagePasteProcess: true, // Disable automatic conversion to Blob
        imageResize: true,
        imageUpload: false,
        imageAddNewLine: true,
        // imageUploadURL: this.$serverfile + 'Froala/upload-image',
        events: {
          // initialized: function () {
          // },
          // 'paste.after': function (val) {
          //   // Do something here.
          //   // this is the editor instance.
          // },
          // 'paste.afterCleanup': function (clipboard_html) {
          //   // Do something here.
          //   // this is the editor instance.
          // },
          // 'paste.before': function (original_event) {
          //   // Do something here.
          //   // this is the editor instance.
          // },
          // 'image.inserted': function ($img, response) {
          //   let editor = this
          //   // // Do something here.
          //   // // this is the editor instance.
          //   const cursorPosition = editor.selection.get();
          //   // Lấy vị trí con trỏ hiện tại
          //   const localImgInsert = localStorage.getItem('localImage')
          //   console.log(localImgInsert)
          //   // Chèn hình ảnh tại vị trí con trỏ
          //   // if (cursorPosition) {
          //   //   // Tạo một đối tượng hình ảnh
          //   //   // const $newImg = document.createElement('img');
          //   //   // $newImg.setAttribute('src', 'URL_HINH_ANH'); // Thay thế bằng URL của hình ảnh bạn muốn chèn
          //   //   const localImgInsert = localStorage.getItem('localImage')
          //   //   if (localImgInsert !== null) {
          //   //     editor.html.insert(localStorage.getItem('localImage'));
          //   //     localStorage.removeItem('localImage')
          //   //   }
          //   //   editor.popups.hideAll();
          //   //   const valueOld = editor.html.get(true)
          //   //   console.log('valueOld')
          //   //   console.log(valueOld)
          //   //   const valueNow = valueOld.replace(/<img[^>]*src="blob:[^"]*"[^>]*>/g, '')
          //   //   console.log('valueNow')
          //   //   console.log(valueNow)
          //   //   editor.html.set(valueNow);
          //   // }
          // },
          // 'image.uploaded': function (response) {
          // },
          // 'image.beforeUpload': function (files) {
          //
          //   // console.log(files)
          //   // debugger
          //   // let editor = this;
          //   // if (files.length) {
          //   //   // Create a File Reader.
          //   //   let reader = new FileReader();
          //   //   // Set the reader to insert images when they are loaded.
          //   //   reader.onload = function (e) {
          //   //     let result = e.target.result;
          //   //     console.log(result)
          //   //     editor.image.insert(result, null, null, editor.image.get());
          //   //   };
          //   //   // Read image as base64.
          //   //   // console.log(files[0])
          //   //   // reader.readAsDataURL(files[0]);
          //   // }
          //   // editor.popups.hideAll();
          //   // // Stop default upload chain.
          //   // return false;
          // },
          // 'image.beforePasteUpload': function (img) {
          //   // Do something here.
          //   // this is the editor instance.
          //   // console.log('image.beforePasteUpload');
          //   // console.log(img);
          // }
        },
        placeholderText: 'Nhập nội dung ...',
        charCounterCount: true,
        spellcheck: false
      },
    };
  },
  mounted() {
    // window.addEventListener('paste', this.handlePaste)
  },
  methods: {
    handlerImageInsert() {
      debugger
    },
    removeBlobImages(content) {
      // Sử dụng regex để tìm và loại bỏ tất cả các thẻ <img> với src bắt đầu bằng "blob:"
      return content.replace(/<img[^>]*src="blob:[^"]*"[^>]*>/g, '');
    },
    handleRenderData() {
      console.log('data-root')
    },
    // handlePaste(event) {
    //   const clipboardData = event.clipboardData || window.clipboardData
    //   const pastedData = clipboardData.getData('text/html')
    //   localStorage.removeItem('localImage')
    //   localStorage.setItem('localImage', pastedData)
    // },
    returnData() {
      debugger
      return this.sendData
    }
  }
}
</script>

<style scoped>

</style>
