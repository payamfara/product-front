/**
 * App eCommerce Add Product Script
 */
'use strict';

//Javascript to handle the e-commerce product add page
Dropzone.autoDiscover = false;
(function () {
    // Comment editor

    // const commentEditor = document.querySelector('.comment-editor');
    //
    // if (commentEditor) {
    //   new Quill(commentEditor, {
    //     modules: {
    //       toolbar: '.comment-toolbar'
    //     },
    //     placeholder: 'توضیحات محصول',
    //     theme: 'snow'
    //   });
    // }

    // previewTemplate: Updated Dropzone default previewTemplate

    // ! Don't change it unless you really know what you are doing

    const previewTemplate = `<div class="dz-preview dz-file-preview">
<div class="dz-details">
  <div class="dz-thumbnail">
    <img data-dz-thumbnail>
    <span class="dz-nopreview">بدون پیشنمایش</span>
    <div class="dz-success-mark"></div>
    <div class="dz-error-mark"></div>
    <div class="dz-error-message"><span data-dz-errormessage></span></div>
    <div class="progress">
      <div class="progress-bar progress-bar-primary" role="progressbar" aria-valuemin="0" aria-valuemax="100" data-dz-uploadprogress></div>
    </div>
  </div>
  <div class="dz-filename" data-dz-name></div>
  <div class="dz-size" data-dz-size></div>
</div>
</div>`;

    // ? Start your code from here

    // Basic Dropzone


    var faOption = {
        dictDefaultMessage: "فایل‌ها را برای ارسال اینجا رها کنید",
        dictFallbackMessage: "مرورگر شما از کشیدن و رهاکردن پشتیبانی نمی‌کند.",
        dictFallbackText: "لطفا از فرم زیر برای ارسال فایل های خود مانند دوران های گذشته استفاده کنید.",
        dictFileTooBig: "فایل خیلی بزرگ است ({{filesize}}MB). حداکثر اندازه فایل: {{maxFilesize}}MB.",
        dictInvalidFileType: "ارسال این نوع فرمت فایل‌ها مجاز نیست.",
        dictResponseError: "سرور با کد {{statusCode}} پاسخ داد.",
        dictCancelUpload: "لغو ارسال",
        dictCancelUploadConfirmation: "آیا از لغو کردن این ارسال اطمینان دارید؟",
        dictRemoveFile: "حذف فایل",
        dictMaxFilesExceeded: "امکان ارسال فایل دیگری وجود ندارد."
    }
    const dropzoneBasic = document.querySelector('#dropzone-basic');
    if (dropzoneBasic) {
        var options = {
            url: `${window.location.origin}/api/save_images/products`,
            previewTemplate: previewTemplate,
            maxFilesize: 5,
            acceptedFiles: '.jpg,.jpeg,.png,.gif,.webp',
            addRemoveLinks: true,
            maxFiles: 3,
            autoProcessQueue: true,
            error: function (file, errorMessage) {
                console.log('خطا در آپلود فایل:', errorMessage);
            },
        };
        Object.assign(options, faOption);
        var myDropzone = new Dropzone(dropzoneBasic, options);
        myDropzone.on("success", function (file, response) {
            // Custom code to update the image preview URL based on the server response
            const newImageUrl = response && response.url ? response.url : file.url;

            // Update the image preview to use the new URL
            const imgTag = file.previewElement.querySelector("img[data-dz-thumbnail]");
            if (imgTag && newImageUrl) {
                imgTag.src = newImageUrl;
            }

            console.log('File uploaded successfully with new URL:', newImageUrl);
        });
        const uploadedFiles = dropzoneBasic.getAttribute('data-uploaded-files').split(',');
        uploadedFiles.forEach(function (url) {
            const fileType = getFileTypeFromURL(url);
            const mockFile = {
                name: url.split('/').pop(),
                size: 12345,
                type: fileType,
                url: url
            };
            myDropzone.emit("addedfile", mockFile);
            myDropzone.emit("thumbnail", mockFile, url)
            myDropzone.emit("complete", mockFile);
            myDropzone.files.push(mockFile);
        });
    }

    const fieldPartNumberEn = $('#id_part_number_en');
    const fieldPartNumberFa = $('#id_part_number_fa');
    const fieldPartNumberBz = $('#id_part_number_bz');
    const labelFieldPartNumberEn = $('#label_id_part_number_en');
    const labelFieldPartNumberFa = $('#label_id_part_number_fa');
    const labelFieldPartNumberBz = $('#label_id_part_number_bz');

    var isFirst = true;
    var updatePartNumbers = function () {
        const is_checked = $('#id_part_number_is_manual').is(":checked");
        const data = get_part_number();
        !isFirst && fieldPartNumberEn.val(!is_checked ? data.en : "");
        !isFirst && fieldPartNumberFa.val(!is_checked ? data.fa : "");
        !isFirst && fieldPartNumberBz.val(!is_checked ? data.bz : "");
        labelFieldPartNumberEn.text(is_checked ? data.en : "");
        labelFieldPartNumberFa.text(is_checked ? data.fa : "");
        labelFieldPartNumberBz.text(is_checked ? data.bz : "");
    }

    $('[type="checkbox"]').change(function (e) {
        $(this).val($(this).is(':checked'))
    });

    $('#id_part_number_is_manual').change(function () {
        const is_checked = $(this).is(":checked")
        fieldPartNumberEn.attr("readonly", !is_checked);
        fieldPartNumberFa.attr("readonly", !is_checked);
        fieldPartNumberBz.attr("readonly", !is_checked);
        updatePartNumbers();
        isFirst = false;
    })

    // $('#product_attrs_items .attribute select').trigger('select');

    $('#product_attrs_items .formset-inner').on('select2:select', '.attribute select', function (e) {
        console.log('ss')
        const type = $(this).attr('data-type');
        const value_field = $(e.delegateTarget).find('.attribute_value');
        const float_field = $(e.delegateTarget).find('.attribute_float');
        const boolean_field = $(e.delegateTarget).find('.attribute_boolean');
        const date_field = $(e.delegateTarget).find('.attribute_date');
        if (type === '0') {
            value_field.removeClass('d-none');
            float_field.addClass('d-none');
            boolean_field.addClass('d-none');
            date_field.addClass('d-none');
        } else if (type === '1') {
            value_field.addClass('d-none');
            float_field.removeClass('d-none');
            boolean_field.addClass('d-none');
            date_field.addClass('d-none');
        } else if (type === '2') {
            value_field.addClass('d-none');
            float_field.addClass('d-none');
            boolean_field.removeClass('d-none');
            date_field.addClass('d-none');
        } else if (type === '3') {
            value_field.addClass('d-none');
            float_field.addClass('d-none');
            boolean_field.addClass('d-none');
            date_field.removeClass('d-none');
        }
    })

    function get_part_number() {
        const vals = {
            'en': [],
            'fa': [],
            'bz': [],
        }
        $.each(vals, function (lang, arr) {
            arr.push($('#id_category').data(`value-${lang}`) || $('#id_category').text().trim())
            $.each($('.ispart'), function (i, el) {
                const $el = $(el);
                const $elType = $el.attr('type')
                let $val = $el.hasClass('select2') ? ($el.data(`value-${lang}`) || $el.text()?.trim()) : $el.val().trim()
                const $prefix = $el.data('prefix') || "";
                const $postfix = $el.data('postfix') || "";
                if (!$val || $val.trim() === "") {
                    return true;
                }
                if ($elType === "radio") {
                    if (!$el.is(":checked")) {
                        return true;
                    }
                }
                arr.push(`${$prefix}${$val}${$postfix}`)
            })
            vals[lang] = arr.join('_')
        })
        return vals
    }


    $('#productForm').on('focusout', '.ispart', function (e) {
        console.log($(this).val())
        updatePartNumbers()
    });

    $('#productForm').on('submit', function (e) {
        console.log('ssssssssss')
        e.preventDefault();
        const actionUrl = $(this).attr('action')
        const formData = new FormData(this)
        const dataImages = myDropzone.files.map(file=>file.url);
        formData.append('images', dataImages)
        console.log($(this).serialize())
        $.ajax({
            url: actionUrl,
            method: 'POST',
            processData: false,
            contentType: false,
            data: formData,
            success: function (response) {
                console.log(response)
                if (response.success) {
                    $.toast({
                        text: 'کارت خوب بود',
                        heading: 'موفقیت آمیز بود!',
                        showHideTransition: 'slide',
                        hideAfter: false,
                        icon: 'success'
                    })
                    $('#attrModal').modal('hide');
                } else {
                    $('#attrModal .modal-body').html(response.form_html);
                }
            },
            error: function () {
                alert('An error occurred. Please try again.');
            }
        });
    })

    document.getElementById('showAddLinkModal').addEventListener('click', function () {
        const existingModal = document.getElementById('addFromLinkModal');
        if (existingModal) {
            existingModal.remove();
        }

        const modalHTML = `
        <div class="modal fade" id="addFromLinkModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content p-3">
                    <div class="modal-header">
                        <h5 class="modal-title">افزودن از لینک</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="بستن"></button>
                    </div>
                    <div class="modal-body">
                        <form id="linkForm">
                            <div class="mb-3">
                                <label for="mediaLink" class="form-label">لینک فایل</label>
                                <input type="url" class="form-control" id="mediaLink" placeholder="لینک را وارد کنید">
                            </div>
                            <button type="button" class="btn btn-primary" id="addLink">افزودن به لیست</button>
                        </form>
                        <hr>
                        <div id="linkList" class="mt-2">
                            <!-- Display list of added links here -->
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">لغو</button>
                        <button type="button" class="btn btn-primary" id="submitLinks">ارسال لینک‌ها</button>
                    </div>
                </div>
            </div>
        </div>`;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const addFromLinkModal = new bootstrap.Modal(document.getElementById('addFromLinkModal'));
        addFromLinkModal.show();

        const linkList = document.getElementById('linkList');
        const addLinkBtn = document.getElementById('addLink');
        const submitLinksBtn = document.getElementById('submitLinks');
        let links = [];

        addLinkBtn.addEventListener('click', function () {
            const mediaLink = document.getElementById('mediaLink').value;
            if (mediaLink) {
                links.push(mediaLink);
                linkList.innerHTML += `<p>${mediaLink}</p>`;
                document.getElementById('mediaLink').value = '';
            }
        });

        function handleLinkSubmission(links) {
            links.forEach(link => {
                fetch(link)
                    .then(response => {
                        let contentType = response.headers.get('content-type');

                        return response.blob().then(blob => {
                            const supportedFormats = {
                                'image/jpeg': 'jpg',
                                'image/png': 'png',
                                'image/gif': 'gif',
                                'image/webp': 'webp'
                            };

                            let [fileName, extension] = link.split('/').pop().split('?')[0].split('.');

                            if (!extension) {
                                extension = supportedFormats[contentType];
                                fileName += `.${extension}`;
                            }

                            if (supportedFormats[contentType]) {
                                const file = new File([blob], fileName, {type: contentType});
                                file.linkSource = true;
                                myDropzone.addFile(file);
                            } else {
                                console.error(`فرمت فایل نامعتبر است: ${contentType}`);
                                alert(`فرمت فایل نامعتبر است: ${contentType}`);
                            }
                        });
                    })
                    .catch(error => console.error('خطا در دریافت فایل:', error));
            });
        }

        submitLinksBtn.addEventListener('click', function () {
            handleLinkSubmission(links);
            links = [];
            linkList.innerHTML = '';
            addFromLinkModal.hide();
        });
    });

    function getPkFromUrl() {
        var pathArray = window.location.pathname.split('/');
        var pk = pathArray[pathArray.length - 1];
        return pk;
    }

    function renderFormsAsCards(forms) {
        const container = $('#variant_attrs_items');

        $.each(forms, function (i, form) {
            const card = createCardFromForm(form[0], form[1].replaceAll("__indx", `__${i + 1}`));
            container.append(card);
        })
    }

    function createCardFromForm(product_url, form) {
        const card = $(
            `<div class="p-2" data-url="${product_url}">
                <div class="card shadow-sm h-100 ${product_url === window.location.pathname ? 'border border-primary' : ''}">
                    <button class="z-3 btn btn-danger btn-sm position-absolute top-0 end-0 m-2 delete-card">
                        <i class="fas fa-trash"></i>
                    </button>
                    <div class="card-body">${form}</div>
                </div>
            </div>`
        );
        card.on('click', '.delete-card', function (e) {
            e.stopPropagation()
            card.remove();
        });
        card.on('click', showModal)
        return card;
    }


    function createPlusButton(form) {
        const $plusCard = $(`
            <div class="p-2">
                <div class="card shadow-sm h-100 p-2" style="min-height: 10rem">
                    <button class="w-100 h-100 btn border-primary text-primary border-dashed">
                       <i class="fs-4 fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        `).on('click', showModal)

        // Append the plus card to the container
        $('#variant_attrs_items').append($plusCard);
    }

    function getFileTypeFromURL(url) {
        const fileExtension = url.split('.').pop().toLowerCase();
        const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];

        if (imageTypes.includes(fileExtension)) {
            return "image/" + fileExtension;
        }

        return "image/jpeg";
    }

    function addImagesFromURLs(urls) {
        urls.forEach(url => {
            const fileType = getFileTypeFromURL(url);

            var mockFile = {
                name: url.split('/').pop(),
                size: 12345,
                type: fileType,
                url: url
            };
            const fileExists = myDropzone.files.some(file => file.url === url);

            if (!fileExists) {
                myDropzone.emit("addedfile", mockFile);
                myDropzone.emit("thumbnail", mockFile, url);
                myDropzone.files.push(mockFile);
                myDropzone.emit("complete", mockFile);
                myDropzone.emit("success", mockFile);
            }
        });
    }


    document.getElementById('showAddFromGalleryModal').addEventListener('click', function () {
        createGallery()
            .then(dataList => createGalleryModal(dataList))
            .then(selectedUrls => {
                addImagesFromURLs(selectedUrls)
            })
            .catch(error => {
                console.error('An error occurred:', error);
            });
    });

    function showModal() {
        const product_url = $(this).data('url')
        if (product_url && product_url !== window.location.pathname) {
            window.open(product_url, "_blank");
        }

        // console.log('sss')
        const $this = $(this)
        $('#confirmButton').data('confirmed', false);
        let cardBody = $this.find('.card-body')
        const modalBody = $('#formModal .modal-body');
        const _this = $this;
        const modalInstance = new bootstrap.Modal(document.getElementById('formModal'));
        modalInstance.show();
        const originalValues = {};
        cardBody.find('input, select, textarea').each(function () {
            const $field = $this;
            originalValues[$field.attr('id')] = $field.val();
        });

        if (!cardBody.length) {
            const comp = $(`<div><div class="card-body">${formCache.replaceAll("__indx", `__${indx + 1}`)}</div></div>`)
            const cardBody = comp.find('.card-body')
            modalBody.html('').append(cardBody);
            indx += 1;
            document.getElementById('formModal').addEventListener('hidden.bs.modal', function () {
                if ($('#confirmButton').data('confirmed')) {
                    const card = $(
                        `<div class="p-2">
                            <div class="card shadow-sm h-100">
                                <button class="z-3 btn btn-danger btn-sm position-absolute top-0 end-0 m-2 delete-card">
                                    <i class="fas fa-trash"></i>
                                </button>
                                <div class="card-body"></div>
                            </div>
                        </div>`
                    );
                    card.find('.card-body').append(cardBody)
                    card.on('click', '.delete-card', function (e) {
                        e.stopPropagation()
                        card.remove();
                    });
                    card.on('click', showModal)
                    $('#variant_attrs_items').append(card)
                } else {
                    indx -= 1
                }
            }, {once: true})
        } else {
            modalBody.html('').append(cardBody);
            _this.find('.card').append(cardBody.clone());
            // modalBody.html(!cardBody.length ? formsCache : cardBody.html());
            document.getElementById('formModal').addEventListener('hidden.bs.modal', function () {
                if (!$('#confirmButton').data('confirmed')) {
                    cardBody.find('input, select, textarea').each(function () {
                        const $field = $this;
                        $field.val(originalValues[$field.attr('id')]).trigger('change');
                    });
                }
                const btn_delete = _this.find('.delete-card');
                _this.find('.card').html('').append(btn_delete).append(cardBody);
            }, {once: true})
        }
        $('#confirmButton').off('click').on('click', function () {
            $this.data('confirmed', true);
            modalInstance.hide();
        });
    }

    var formCache;
    var indx;
    $('#id_category').change(function () {
        const val = $(this).val();
        if (!val || !val.length) {
            $('#category_attrs').hide()
            $('#variant_attrs').hide()
        } else {
            $('#category_attrs').show()
            $('#variant_attrs').show()
            const pk = getPkFromUrl();
            $.ajax({
                url: `/admin/myapp/product/get-attr-data/${parseInt(val)}${parseInt(pk) ? `/${parseInt(pk)}` : ""}`,
                success: function (data) {
                    $('#category_attrs_items').html(data.form_attr_html);
                    // $('#table_variant_body').html(data.form_attr_variant_html.replace("___indx", `1`).replaceAll("__indx", "__1"));
                    $('#variant_attrs_items').html('')
                    formCache = data.forms_attr_variant_html.pop()[1];
                    indx = data.forms_attr_variant_html.length;
                    createPlusButton();
                    renderFormsAsCards(data.forms_attr_variant_html);
                    updatePartNumbers();

                }
            });
        }
    })

    $('#id_category').trigger('change');
    $('#formModal').on('click', '.updateUrl', function () {
        const modalBody = $('#attrModal .modal-body');
        const _this = $(this);
        let actionUrl = $(this).data('url');
        const inputValue = $(`#${$(this).data('input-id')}`).text();
        actionUrl += inputValue ? `?value=${inputValue}` : ''
        const modalInstance = new bootstrap.Modal(document.getElementById('attrModal'));
        modalInstance.show();
        $.ajax({
            url: actionUrl,
            success: function (data) {
                modalBody.find('form').html(data.form_html);
                modalBody.find('form').attr('action', actionUrl);
            }
        });
    })
    $('#formModal').on('click', '.addUrl', function () {
        const modalBody = $('#attrModal .modal-body');
        const _this = $(this);
        let actionUrl = $(this).data('url');
        const inputValue = $('.select2-container--open .select2-search__field').val();
        actionUrl += inputValue ? `?value=${inputValue}` : ''
        const modalInstance = new bootstrap.Modal(document.getElementById('attrModal'));
        modalInstance.show();
        $.ajax({
            url: actionUrl,
            success: function (data) {
                modalBody.find('form').html(data.form_html);
                modalBody.find('form').attr('action', actionUrl);
            }
        });
    })

    // Handle form submission on "Confirm" click
    $('#attrModal').on('click', '#confirmButton', function () {
        const form = $('#attrModal .modal-body form'); // Select the form inside the modal body
        const actionUrl = form.attr('action'); // Get the form action URL

        $.ajax({
            url: actionUrl,
            method: 'POST',
            data: form.serialize(),
            success: function (response) {
                if (response.success) {
                    $('#attrModal').modal('hide');
                } else {
                    $('#attrModal .modal-body').html(response.form_html);
                }
            },
            error: function () {
                alert('An error occurred. Please try again.');
            }
        });
    });


    // Basic Tags

    const tagifyBasicEl = document.querySelector('#ecommerce-product-tags');
    const TagifyBasic = new Tagify(tagifyBasicEl);

    // Flatpickr

    // Datepicker
    const date = new Date();

    const productDate = document.querySelector('.product-date');

    if (productDate) {
        productDate.flatpickr({
            disableMobile: "true",
            monthSelectorType: 'static',
            locale: 'fa',
            defaultDate: date
        });
    }
})();

//Jquery to handle the e-commerce product add page

$(function () {
    // Select2
    var select2 = $('.select2');
    if (select2.length) {
        select2.each(function () {
            var $this = $(this);
            $this.wrap('<div class="position-relative"></div>').select2({
                dropdownParent: $this.parent(),
                placeholder: $this.data('placeholder') // for dynamic placeholder
            });
        });
    }

    var formRepeater = $('.form-repeater');

    // Form Repeater
    // ! Using jQuery each loop to add dynamic id and class for inputs. You may need to improve it based on form fields.
    // -----------------------------------------------------------------------------------------------------------------

    if (formRepeater.length) {
        var row = 2;
        var col = 1;
        formRepeater.on('submit', function (e) {
            e.preventDefault();
        });
        formRepeater.repeater({
            show: function () {
                var fromControl = $(this).find('.form-control, .form-select');
                var formLabel = $(this).find('.form-label');

                fromControl.each(function (i) {
                    var id = 'form-repeater-' + row + '-' + col;
                    $(fromControl[i]).attr('id', id);
                    $(formLabel[i]).attr('for', id);
                    col++;
                });

                row++;
                $(this).slideDown();
                $('.select2-container').remove();
                $('.select2.form-select').select2({
                    placeholder: 'متن جایگزین'
                });
                $('.select2-container').css('width', '100%');
                $('.form-repeater:first .form-select').select2({
                    dropdownParent: $(this).parent(),
                    placeholder: 'متن جایگزین'
                });
                $('.position-relative .select2').each(function () {
                    $(this).select2({
                        dropdownParent: $(this).closest('.position-relative')
                    });
                });
            }
        });
    }
});
