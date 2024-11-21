
(function($) {
    $(document).ready(function() {
        function getPkFromUrl() {
            var pathArray = window.location.pathname.split('/');
            var pk = pathArray[pathArray.length - 3];
            return pk;
        }
        $('#id_part_number_is_manual').change(function() {
            var fieldPartNumberEn = $('#id_part_number_en');
            var fieldPartNumberFa = $('#id_part_number_fa');
            var fieldPartNumberBz = $('#id_part_number_bz');
            if  ($(this).is(":checked")) {
                fieldPartNumberEn.attr("readonly", "false");
                fieldPartNumberFa.attr("readonly", "false");
                fieldPartNumberBz.attr("readonly", "false");
                fieldPartNumberEn.val('');
                fieldPartNumberFa.val('');
                fieldPartNumberBz.val('');
            } else {
                const pk = getPkFromUrl();
                console.log(pk)
                $.ajax({
                    url: `/admin/myapp/product/get-part-number/${pk}`,  // Update with your app's URL structure
                    success: function(data) {
                        console.log(data)
                        fieldPartNumberEn.attr("readonly", "true");
                        fieldPartNumberFa.attr("readonly", "true");
                        fieldPartNumberBz.attr("readonly", "true");
                        fieldPartNumberEn.val(data.en);
                        fieldPartNumberFa.val(data.fa);
                        fieldPartNumberBz.val(data.bz);
                    }
                });
            }
        });
        // $('#id_category').change(function() {
        //     if(!$(this).val().length) {
        //         $('#product_attrs-group').hide()
        //     } else {
        //         $('#product_attrs-group').show()
        //     }
        // })
        $('.field-attribute').on('change', ' select', function (e) {
            const attrPk = $(this).val();
            $.ajax({
                url: `/admin/myapp/product/get-attr-data/${attrPk}`,
                success: function(data) {
                    $.each($(e.delegateTarget).siblings().find(' select, input'), function(i,el) {
                      $(el).removeAttr('disabled');
                    })
                    $.each(data.hidden_fields, function(i, fieldName){
                        $.each($(e.delegateTarget).siblings(`.field-${fieldName}`).find(' select, input'), function(i,el) {
                          $(el).attr('disabled', 'disabled');
                        })
                    })
                    if (data.attr_values) {
                        const attrValueSelect = $(e.delegateTarget).siblings(`.field-attribute_value`).find(' select')
                        attrValueSelect.html('')
                        $.each(data.attr_values, function (i, attrValue) {
                            const option = new Option(attrValue.label, attrValue.id);
                            attrValueSelect.append(option);
                        });
                    }
                }
            });
        })

    });
})(jQuery);