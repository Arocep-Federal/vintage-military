/*!
 * Validator v0.11.9 for Bootstrap 3, by @1000hz
 * Copyright 2017 Cina Saffary
 * Licensed under http://opensource.org/licenses/MIT
 *
 * https://github.com/1000hz/bootstrap-validator
 RFQv2.0
 */

+function(a){"use strict";function b(b){return b.is('[type="checkbox"]')?b.prop("checked"):b.is('[type="radio"]')?!!a('[name="'+b.attr("name")+'"]:checked').length:b.is("select[multiple]")?(b.val()||[]).length:b.val()}function c(b){return this.each(function(){var c=a(this),e=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b),f=c.data("bs.validator");(f||"destroy"!=b)&&(f||c.data("bs.validator",f=new d(this,e)),"string"==typeof b&&f[b]())})}var d=function(c,e){this.options=e,this.validators=a.extend({},d.VALIDATORS,e.custom),this.$element=a(c),this.$btn=a('button[type="submit"], input[type="submit"]').filter('[form="'+this.$element.attr("id")+'"]').add(this.$element.find('input[type="submit"], button[type="submit"]')),this.update(),this.$element.on("input.bs.validator change.bs.validator focusout.bs.validator",a.proxy(this.onInput,this)),this.$element.on("submit.bs.validator",a.proxy(this.onSubmit,this)),this.$element.on("reset.bs.validator",a.proxy(this.reset,this)),this.$element.find("[data-match]").each(function(){var c=a(this),d=c.attr("data-match");a(d).on("input.bs.validator",function(){b(c)&&c.trigger("input.bs.validator")})}),this.$inputs.filter(function(){return b(a(this))&&!a(this).closest(".has-error").length}).trigger("focusout"),this.$element.attr("novalidate",!0)};d.VERSION="0.11.9",d.INPUT_SELECTOR=':input:not([type="hidden"], [type="submit"], [type="reset"], button)',d.FOCUS_OFFSET=20,d.DEFAULTS={delay:500,html:!1,disable:!0,focus:!0,custom:{},errors:{match:"Does not match",minlength:"Not long enough"},feedback:{success:"glyphicon-ok",error:"glyphicon-remove"}},d.VALIDATORS={"native":function(a){var b=a[0];return b.checkValidity?!b.checkValidity()&&!b.validity.valid&&(b.validationMessage||"error!"):void 0},match:function(b){var c=b.attr("data-match");return b.val()!==a(c).val()&&d.DEFAULTS.errors.match},minlength:function(a){var b=a.attr("data-minlength");return a.val().length<b&&d.DEFAULTS.errors.minlength}},d.prototype.update=function(){var b=this;return this.$inputs=this.$element.find(d.INPUT_SELECTOR).add(this.$element.find('[data-validate="true"]')).not(this.$element.find('[data-validate="false"]').each(function(){b.clearErrors(a(this))})),this.toggleSubmit(),this},d.prototype.onInput=function(b){var c=this,d=a(b.target),e="focusout"!==b.type;this.$inputs.is(d)&&this.validateInput(d,e).done(function(){c.toggleSubmit()})},d.prototype.validateInput=function(c,d){var e=(b(c),c.data("bs.validator.errors"));c.is('[type="radio"]')&&(c=this.$element.find('input[name="'+c.attr("name")+'"]'));var f=a.Event("validate.bs.validator",{relatedTarget:c[0]});if(this.$element.trigger(f),!f.isDefaultPrevented()){var g=this;return this.runValidators(c).done(function(b){c.data("bs.validator.errors",b),b.length?d?g.defer(c,g.showErrors):g.showErrors(c):g.clearErrors(c),e&&b.toString()===e.toString()||(f=b.length?a.Event("invalid.bs.validator",{relatedTarget:c[0],detail:b}):a.Event("valid.bs.validator",{relatedTarget:c[0],detail:e}),g.$element.trigger(f)),g.toggleSubmit(),g.$element.trigger(a.Event("validated.bs.validator",{relatedTarget:c[0]}))})}},d.prototype.runValidators=function(c){function d(a){return c.attr("data-"+a+"-error")}function e(){var a=c[0].validity;return a.typeMismatch?c.attr("data-type-error"):a.patternMismatch?c.attr("data-pattern-error"):a.stepMismatch?c.attr("data-step-error"):a.rangeOverflow?c.attr("data-max-error"):a.rangeUnderflow?c.attr("data-min-error"):a.valueMissing?c.attr("data-required-error"):null}function f(){return c.attr("data-error")}function g(a){return d(a)||e()||f()}var h=[],i=a.Deferred();return c.data("bs.validator.deferred")&&c.data("bs.validator.deferred").reject(),c.data("bs.validator.deferred",i),a.each(this.validators,a.proxy(function(a,d){var e=null;!b(c)&&!c.attr("required")||void 0===c.attr("data-"+a)&&"native"!=a||!(e=d.call(this,c))||(e=g(a)||e,!~h.indexOf(e)&&h.push(e))},this)),!h.length&&b(c)&&c.attr("data-remote")?this.defer(c,function(){var d={};d[c.attr("name")]=b(c),a.get(c.attr("data-remote"),d).fail(function(a,b,c){h.push(g("remote")||c)}).always(function(){i.resolve(h)})}):i.resolve(h),i.promise()},d.prototype.validate=function(){var b=this;return a.when(this.$inputs.map(function(){return b.validateInput(a(this),!1)})).then(function(){b.toggleSubmit(),b.focusError()}),this},d.prototype.focusError=function(){if(this.options.focus){var b=this.$element.find(".has-error:first :input");0!==b.length&&(a("html, body").animate({scrollTop:b.offset().top-d.FOCUS_OFFSET},250),b.focus())}},d.prototype.showErrors=function(b){var c=this.options.html?"html":"text",d=b.data("bs.validator.errors"),e=b.closest(".form-group"),f=e.find(".help-block.with-errors"),g=e.find(".form-control-feedback");d.length&&(d=a("<ul/>").addClass("list-unstyled").append(a.map(d,function(b){return a("<li/>")[c](b)})),void 0===f.data("bs.validator.originalContent")&&f.data("bs.validator.originalContent",f.html()),f.empty().append(d),e.addClass("has-error has-danger"),e.hasClass("has-feedback")&&g.removeClass(this.options.feedback.success)&&g.addClass(this.options.feedback.error)&&e.removeClass("has-success"))},d.prototype.clearErrors=function(a){var c=a.closest(".form-group"),d=c.find(".help-block.with-errors"),e=c.find(".form-control-feedback");d.html(d.data("bs.validator.originalContent")),c.removeClass("has-error has-danger has-success"),c.hasClass("has-feedback")&&e.removeClass(this.options.feedback.error)&&e.removeClass(this.options.feedback.success)&&b(a)&&e.addClass(this.options.feedback.success)&&c.addClass("has-success")},d.prototype.hasErrors=function(){function b(){return!!(a(this).data("bs.validator.errors")||[]).length}return!!this.$inputs.filter(b).length},d.prototype.isIncomplete=function(){function c(){var c=b(a(this));return!("string"==typeof c?a.trim(c):c)}return!!this.$inputs.filter("[required]").filter(c).length},d.prototype.onSubmit=function(a){this.validate(),(this.isIncomplete()||this.hasErrors())&&a.preventDefault()},d.prototype.toggleSubmit=function(){this.options.disable&&this.$btn.toggleClass("disabled",this.isIncomplete()||this.hasErrors())},d.prototype.defer=function(b,c){return c=a.proxy(c,this,b),this.options.delay?(window.clearTimeout(b.data("bs.validator.timeout")),void b.data("bs.validator.timeout",window.setTimeout(c,this.options.delay))):c()},d.prototype.reset=function(){return this.$element.find(".form-control-feedback").removeClass(this.options.feedback.error).removeClass(this.options.feedback.success),this.$inputs.removeData(["bs.validator.errors","bs.validator.deferred"]).each(function(){var b=a(this),c=b.data("bs.validator.timeout");window.clearTimeout(c)&&b.removeData("bs.validator.timeout")}),this.$element.find(".help-block.with-errors").each(function(){var b=a(this),c=b.data("bs.validator.originalContent");b.removeData("bs.validator.originalContent").html(c)}),this.$btn.removeClass("disabled"),this.$element.find(".has-error, .has-danger, .has-success").removeClass("has-error has-danger has-success"),this},d.prototype.destroy=function(){return this.reset(),this.$element.removeAttr("novalidate").removeData("bs.validator").off(".bs.validator"),this.$inputs.off(".bs.validator"),this.options=null,this.validators=null,this.$element=null,this.$btn=null,this.$inputs=null,this};var e=a.fn.validator;a.fn.validator=c,a.fn.validator.Constructor=d,a.fn.validator.noConflict=function(){return a.fn.validator=e,this},a(window).on("load",function(){a('form[data-toggle="validator"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery);



function GRFQ_setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function GRFQ_getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

(function(){

  window.GRFQApp = {};

  var loadScript = function(url, callback, errcallback){
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState){// If the browser is Internet Explorer.
      script.onreadystatechange = function(){
        if (script.readyState == "loaded" || script.readyState == "complete"){
          script.onreadystatechange = null;
          callback();
        }
      };
      setTimeout(function(){
        if(script.onreadystatechange !== null){
          if(errcallback !== undefined) errcallback();
        }
      },3000);
    } else { // For any other browser.
      script.onload = function(){
        callback();
      };
      script.onerror = function(){
        if(errcallback !== undefined) errcallback();
      }
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  };
  GRFQApp.AppURL = GRFQConfigs.app_url;
  GRFQApp.init = function($){
    window.spuritJQ = $;
    //AnhEz
    GRFQApp.UpdateQuoteCart();
    //
      var installed = false;
      $("script").each(function() {
        if ($(this).text().indexOf("globorequestforquote_init.js?") != -1 && $(this).text().indexOf("asyncLoad") != -1 && $(this).text().indexOf("initSchema") == -1) {
          installed = true;
        }
      });
      // Validator
      $('body').on('change','.groupCheckbox .checkboxgroup',function(){
        var list = $(this).closest('.form-group').find('.checkboxgroup')
        let pass = false
        list.each(function(i,ckb){
          if($(ckb).prop('checked')){
              pass = true;
          }
        })
        if(pass){
            $(this).closest('.form-group').find('.hiddenGroupCheckBox').removeAttr('required')
        }else{
            $(this).closest('.form-group').find('.hiddenGroupCheckBox').attr('required',true)
        }
      })
      $('body').on('change','.rfq-table .item_qty',function(){
      	GRFQApp.updateRows()
      })

      if(installed&&GRFQApp.getPageType()!='page'){
        $(window).keydown(function(event){
          if(event.keyCode == 13) {
            var parent_ = event.target.closest("#rfq_form");
            if(parent_ != null && event.target.tagName != 'TEXTAREA'){
                event.preventDefault();
              return false;
            }
          }
        });
        // Show hide Add to cart
        if(GRFQConfigs.show_atc=='0') $(GRFQConfigs.selector.addtocart_selector).attr('style','display:none !important');

		if(GRFQConfigs.show_price=='0') $(GRFQConfigs.selector.price_selector).attr('style','display:none !important');
        if(GRFQApp.getPageType() == 'collection' || GRFQApp.getPageType() == 'product' || GRFQApp.getPageType() == 'search' || GRFQApp.getPageType() == '' || typeof forceRFQCollectionPage !== 'undefined' ){
          $('.rfq-collection-script').each(function(k,elem){
              let value = $(elem).attr('data-id')
              if(value){
                  let is_disable = !GRFQApp.isEnabled(GRFQCollection[value])
                  if(!is_disable){

                      // Find add to cart in collection page
                      var parent_cart_selector = $(this).parent();

                      var cart_selector = parent_cart_selector.find(GRFQConfigs.selector.addtocart_selector+',.rfq-add-to-cart:not(.rfq-product-selector)');

                      var max_loop = 0;
                      while (cart_selector.length==0 && max_loop<3){
                        max_loop++;
                        parent_cart_selector = parent_cart_selector.parent();
                        cart_selector = parent_cart_selector.find(GRFQConfigs.selector.addtocart_selector+',.rfq-add-to-cart:not(.rfq-product-selector)');
                      }
                      if(cart_selector.length>0&&GRFQConfigs.show_atc=='1'){

                          cart_selector.attr('style','display:none !important');
                      }
                      // Find price in collection page
                      var parent_price_selector = $(this).parent();
                      var price_selector = parent_price_selector.find(GRFQConfigs.selector.price_selector+',.rfq-price:not(.rfq-product-selector)');
                      var max_loop_ = 0;
                      while (price_selector.length==0 && max_loop_<3){
                        max_loop_++;
                        parent_price_selector = parent_price_selector.parent();
                        price_selector = parent_price_selector.find(GRFQConfigs.selector.price_selector+',.rfq-price:not(.rfq-product-selector)');
                      };
                      if(price_selector.length>0&&GRFQConfigs.show_price=='1'){
                          price_selector.attr('style','display:none !important');
                      }
                  }
              }
          })
        }

        if(GRFQApp.getPageType() == 'product' || typeof forceRFQProductPage !== 'undefined'){
          if(GRFQConfigs.shop_url=="mueblesysillones.myshopify.com") if(GRFQConfigs.show_atc=='0') $(GRFQConfigs.selector.addtocart_selector).attr('style','display:none !important');
          if(GRFQConfigs.show_atc=='0') $(GRFQConfigs.selector.addtocart_selector).attr('style','display:none !important');

		  if(GRFQConfigs.shop_url=="mueblesysillones.myshopify.com") if(GRFQConfigs.show_price=='0') $(GRFQConfigs.selector.price_selector).attr('style','display:none !important');
          if(GRFQConfigs.show_price=='0') $(GRFQConfigs.selector.price_selector).attr('style','display:none !important');

          var id_product = GRFQConfigs.product.id;
          var is_disabled = !GRFQApp.isEnabled(GRFQConfigs.product)


          if(!is_disabled){
            if(GRFQConfigs.show_atc=='1') {
              if(GRFQConfigs.shop_url=="mueblesysillones.myshopify.com" || GRFQConfigs.shop_url=="gripps-global.myshopify.com") $(GRFQConfigs.selector.addtocart_selector).attr('style','display: none !important');
              else $(GRFQConfigs.selector.addtocart_selector).eq(0).attr('style','display: none !important');

              if(typeof window.forceProductCartSelector !== 'undefined'){
              	$(window.forceProductCartSelector).attr('style','display: none !important');
              }
            }
            if(GRFQConfigs.show_price=='1') {
              if(GRFQConfigs.shop_url=="mueblesysillones.myshopify.com"||GRFQConfigs.shop_url=="the-real-fur-deal.myshopify.com"||GRFQConfigs.shop_url=="lamporia-com.myshopify.com"||GRFQConfigs.shop_url=="amazontomaldives.myshopify.com"||GRFQConfigs.shop_url=="digital-base-australia.myshopify.com"||GRFQConfigs.shop_url=="elbow45-com.myshopify.com"||GRFQConfigs.shop_url=="samantha1.myshopify.com"||GRFQConfigs.shop_url=="gripps-global.myshopify.com" || GRFQConfigs.shop_url=="devon-lifestyle-nz.myshopify.com"){
                  $(GRFQConfigs.selector.price_selector).attr('style','display: none !important');
                  $(GRFQConfigs.selector.price_selector).find($(GRFQConfigs.selector.price_selector)).attr('style','display: none !important');
              }else {
                  $(GRFQConfigs.selector.price_selector).eq(0).attr('style','display: none !important');
                  $(GRFQConfigs.selector.price_selector).eq(0).find($(GRFQConfigs.selector.price_selector)).attr('style','display: none !important');
              }
              if(typeof window.forceProductPriceSelector !== 'undefined'){
              	$(window.forceProductPriceSelector).attr('style','display: none !important');
              }
            }
          }else{
          	$(GRFQConfigs.selector.price_selector).find($(GRFQConfigs.selector.price_selector)).attr('style','display: ');
            $(GRFQConfigs.selector.addtocart_selector).eq(0).attr('style','display: ')
          }
          if(GRFQConfigs.shop_url=="lamporia-com.myshopify.com"&&!is_disabled){
              console.log($('form[action="/cart/add"]').addClass('globo-rfq-hide-buynow'));
          }

          if(GRFQConfigs.product_enable != false && is_disabled == false ){





            if(GRFQConfigs.product_enable == 2){

              var ajax_data = "shop="+GRFQConfigs.shop_url;

              if(GRFQConfigs.customer.name != false)
                ajax_data += "&customer_name="+GRFQConfigs.customer.name;

              if(GRFQConfigs.customer.email != false)
                ajax_data += "&customer_email="+GRFQConfigs.customer.email;

              if(GRFQConfigs.customer.id != false)
                ajax_data += "&customer_id="+GRFQConfigs.customer.id;

              var quote_id = GRFQ_getCookie(GRFQConfigs.shop_url+"quote.id");
              if (typeof quote_id != 'undefined')
                ajax_data += '&quote='+quote_id;

              $.ajax({
                url: GRFQApp.AppURL+"/getform",
                dataType: 'jsonp',
                type: "POST",
                data: ajax_data,
                success: function(result){
                  if(result.success == true){
                    var addtocart_btn = $('.g-atc');
                    if($(addtocart_btn).length==0){
                         addtocart_btn = $("form[action*='cart']:visible, form[action*='checkout']:visible").first();
                    }
                    if($('#rfq_product_form').length == 0){
                    	$(result.html).insertAfter(addtocart_btn);
                    }

                    if( $( ".datepicker" ).length > 0 ){

                      if (typeof jQuery.ui === 'undefined') {
                        loadScript('//code.jquery.com/ui/1.10.4/jquery-ui.min.js', function(){
                          $( ".datepicker" ).datepicker({dateFormat: 'd MM, yy'});
                        });
                      }
                    }
                    // $.validator.addClassRules("checkboxGroup", {
                    //   checboxGroup: true
                    // });
                    $('#rfq_product_form').validator({
                        custom: {
                            filename: function($el) {
                                var str = ''
                                if($el[0].files.length) str = $el[0].files[0].name
                                  const regex = /^\..*$/;
                                let m;
                                if ((m = regex.exec(str)) !== null) {
                                  return true
                                }
                                return false;
                            },
                            filesize: function($el) {
                              if($el[0].files.length){
                              	var size = $el[0].files[0].size/1024/1024
                                var maxSize = $el.attr('data-filesize');
                                if(size > maxSize){
                                  return true;
                                }
                              }
                              
                              return false;
                            },
                            fileextension: function($el) {
                              if($el[0].files.length){
                              	var allowed_extensions = JSON.parse($el.attr('data-fileextension'));
                                if(allowed_extensions != null){
                                  var ext = /^.+\.([^.]+)$/.exec($el[0].files[0].name);
                                  ext = ext == null ? "" : ext[1];
                                  console.log(ext)
                                  if(ext != '' && ext != null && allowed_extensions.indexOf(ext.toLowerCase()) > -1){
                                    return false
                                  }else{
                                  	return true;
                                  }
                                }
                              }
                              return false
                          }
                        }
                    }).on('submit', function (e) {
                      if (e.isDefaultPrevented()) {
                        return false;
                      } else {
                        e.preventDefault();
                        var product_id = GRFQConfigs.product.id
                        data = $('#rfq_product_form').serialize();
                        data += '&product_id='+GRFQConfigs.product.id;

                        var options = "";
                        if($('[name=id]').length > 0){

                          if($('[name=id]').length > 1){
                            var variant_id = $('[name=id]:checked').val();
                          }
                          if(typeof variant_id === "undefined")
                            var variant_id = $('[name=id]').val();


                          if(variant_id != null){
                            data += '&variant_id='+variant_id;
                          }
                          data += '&name='+encodeURIComponent(GRFQConfigs.product.title);
						  var variant_price = 0;
                          $.each(GRFQConfigs.product.variants, function(i, variant){
                            if( variant.id == variant_id ){
                              if(variant.title.indexOf('Default') == -1){
                                options = '&option='+variant.title;
                              }
							 variant_price = variant.price;

                              if( variant.featured_image != null )
                                data += '&image='+variant.featured_image.src;
                              else if( GRFQConfigs.product.featured_image != null )
                                data += '&image='+GRFQConfigs.product.featured_image;
                              else
                                data += '&image='+GRFQConfigs.product.images[0];
                            }
                          });
                        }
                        if( $('[name^="properties"]').length){
                          console.log(1.2)
                          var properties = {};
                          if(options!=""){
                            if(typeof options  !== 'string'){
                                $.each(JSON.parse(JSON.stringify(options)),function(k,v){
                                  properties[k] = {};
                                  properties[k].name = v.name;
                                });
                            }
                            else
                              properties["Variant"] = {"name":options};
                          }
                          $.each($('[name^="properties"]').serializeArray(), function(i, input){
                            if(input.name.indexOf('properties[_') > -1){
                                if(input.name === 'properties[_boldVariantPrices]'){
                                    var prices = input.value.split(',')
                                    boldPrice = 0
                                    for( var i=0;i<prices.length;i++){
                                        boldPrice += parseInt(prices[i])
                                    }

                                }
                                return true;
                            }
                            if(input.value&&input.value!=''){
                                var k = input.name.replace('properties[', '').replace(']', '');
                                properties[k] = {};
                                properties[k].name = k+': '+input.value;
                            }
                          });
                          options = JSON.stringify(properties);
                        }

//========================================== Get Option================================================================

                        var add_data = 'product_id='+product_id+'&shop='+GRFQConfigs.shop_url;

                        var form = $('#rfq_product_form');
                        var variant_selector =  form.find('[name=id]');
                        var qty = 0;
                        if($(variant_selector).length > 0){
                          if($(variant_selector).length > 1){
                            var variant_id = form.find('[name=id]:checked').val();
                          }else{
                            var variant_id = $(variant_selector).val();
                          }
                          // SKU

                          if(variant_id){
                            var sku = 0;
                            $.each(GRFQConfigs.product.variants,function(key,item){
                              if(item.id==variant_id){
                                sku = item.sku;
                              }
                            });
                            if(sku) add_data += '&sku='+sku;
                          }


                          add_data += '&variant_id='+variant_id;
                        }
                        var vendor = GRFQConfigs.product.vendor;
                        if(vendor!='') add_data += "&vendor="+vendor;

                        if($('input[name=quantity]').length > 0){
                          add_data += '&qty='+$('[name=quantity]').val();
                          qty = $('[name=quantity]').val();
                        }
                        else {
                          qty = 1;
                          add_data += '&qty=1';
                        }
                        add_data += '&name='+encodeURIComponent(GRFQConfigs.product.title);

                        var options = "";

                        var quote_id = GRFQ_getCookie(GRFQConfigs.shop_url+"quote.id");
                        if (typeof quote_id != 'undefined'&&quote_id!='')
                          add_data += '&quote='+quote_id;

                      var wrong_variant = true;
                      var image = '';
                        $.each(GRFQConfigs.product.variants, function(i, variant){
                          if( variant.id == variant_id ){
                            wrong_variant = false;
                              console.log("Right variant");
                            if(variant.title.indexOf('Default') == -1)
                              options = variant.title;

                            if( variant.featured_image != null ){
                              image = variant.featured_image.src;
                              add_data += '&image='+variant.featured_image.src;
                            }else if( GRFQConfigs.product.featured_image != null ){
                              image = GRFQConfigs.product.featured_image;
                              add_data += '&image='+GRFQConfigs.product.featured_image;
                            }else{
                              image = GRFQConfigs.product.images[0];
                              add_data += '&image='+GRFQConfigs.product.images[0];
                            }
                          }

                        });
                        if(wrong_variant){
                          image = GRFQConfigs.product.featured_image;
                          add_data += '&image='+GRFQConfigs.product.featured_image;
                        }

                        // Get URL
                        var product_url = '';
                        if(GRFQConfigs.product&&GRFQConfigs.product.handle!=null){
                          product_url = '//'+GRFQConfigs.shop_url+'/products/'+GRFQConfigs.product.handle;
                            if(!wrong_variant){
                                product_url += '?variant='+variant_id;
                            }
                        }

                        add_data += '&product_url='+product_url;

                        console.log("option has value is : "+options);
                        if ($('[name^="properties"]').length) {
                            console.log("1");
                            if($('[name="properties[_boldProductIds]"]').length){
                              console.log("1.1");
                              var properties = {};
                              var product_ids = '';
                              var variant_ids='';
                              var product_names='';
                              var product_prices='';
                              var product_qties='';
                              if($('[name="properties[_boldProductIds]"]').length) product_ids    = $('[name="properties[_boldProductIds]"]').val().split(",");
                              if($('[name="properties[_boldVariantIds]"]').length) variant_ids    = $('[name="properties[_boldVariantIds]"]').val().split(",");
                              if($('[name="properties[_boldVariantNames]"]').length) product_names    = $('[name="properties[_boldVariantNames]"]').val().split(",");
                              if($('[name="properties[_boldVariantPrices]"]').length) product_prices    = $('[name="properties[_boldVariantPrices]"]').val().split(",");
                              if($('[name="properties[_boldVariantQtys]"]').length) product_qties    = $('[name="properties[_boldVariantQtys]"]').val().split(",");

                              if (options != '')
                                properties[product_id] = {
                                  variant_id: null,
                                  name: options,
                                  price: null,
                                  qty: null
                                };
                              var boldPrice = 0;
                              $.each(product_ids, function(i, propertie_product_id) {
                                properties[propertie_product_id] = {};
                                properties[propertie_product_id].variant_id = variant_ids[i] || null;
                                properties[propertie_product_id].name = product_names[i].replace("%2C", ",") || null;
                                properties[propertie_product_id].price = product_prices[i] || null;
                                properties[propertie_product_id].qty = product_qties[i] || 1
                                boldPrice += parseInt(product_prices[i]) || 0;
                              });
                              console.log("1.1.1 Prop: ");
                              console.log(properties);
                              options = JSON.stringify(properties);
                            }else{
                              console.log("1.2");
                              var properties = {};
                              if(options!=""){
                                properties["Variant"] = {"name":options};
                              }

                              $.each($('[name^="properties"]').serializeArray(), function(i, input){
                                if(input.value&&input.value!=''){
                                    var k = input.name.replace('properties[', '').replace(']', '');
                                    properties[k] = {};
                                    properties[k].name = k+': '+input.value;
                                }
                              });
                              console.log(properties);
                              options = JSON.stringify(properties);
                              if($('.pricing-info-total-price').length){
                                var w3Qty = parseInt($('[name="quantity"]').val())
                              	var w3Price = Number($('.pricing-info-total-price').text().replace(/[^0-9.-]+/g,""))
                                if(w3Qty !== NaN && w3Qty){
                                	w3Price = (w3Price/w3Qty)*100
                                }
                              }
                            }
                          }
						
                        // Check if Product has price
                        var priceSelector = $(GRFQConfigs.selector.price_selector)
                        if(priceSelector.length>0||GRFQConfigs.product.price||typeof w3Price !== 'undefined'){

                          var price = 0;

                          if(variant_id&&variant_id>0){
                            for(var k = 0 ; k < GRFQConfigs.product.variants.length ; k++){
                                if(GRFQConfigs.product.variants[k].id==variant_id){
                                	price = GRFQConfigs.product.variants[k].price
                                }
                            }
                          }else {
                              price = GRFQConfigs.product.price
                          }



                          if(typeof $(priceSelector).attr('data-mw-orig-price')!== 'undefined') price = $(priceSelector).attr('data-mw-orig-price');
                          if(priceSelector.length==1&&typeof options !== 'string') price = parseFloat((priceSelector.html()).replace(/\D+/g, ''));
                          if(typeof boldPrice !== 'undefined' && boldPrice>0) {price = boldPrice };
                          if(typeof w3Price !== 'undefined' && w3Price>0) {price = w3Price };
                          if(typeof forceRFQPrice !== 'undefined'){
                            price = forceRFQPrice
                          }
                          add_data += '&price='+price;
                        }

                        add_data += '&option='+options;
                        console.log(options);

                        $('input[type=file]',$('#rfq_product_form')).each(function() {
                            var files = $(this).prop('files');
                            if ( files != undefined && files.length <= 0 ) {
                                $(this).removeAttr('name');
                            }
                        });

                        var dataForm = new FormData($('#rfq_product_form')[0]);
                        dataForm.append('shop', GRFQConfigs.shop_url);
                        dataForm.append('name', GRFQConfigs.product.title);
                        dataForm.append('product_id', product_id);
                        if(variant_id != null){
                        	dataForm.append('variant_id', variant_id);
                        }
                        dataForm.append('vendor', vendor);
                        dataForm.append('sku', sku);
                        dataForm.append('product_url', product_url);
                        dataForm.append('image', image);
                        dataForm.append('option', options);
                        dataForm.append('qty', qty);
                        dataForm.append('price', price);
//========================================== EDD ====================================================================================


                        if($('[name=quantity]').length > 0)
                          data += '&qty='+$('[name=quantity]').val();


                        if($("#rfq_form .g-recaptcha").length){
                        	if(!grecaptcha.getResponse()){
                                alert("Please verify you are not a robot.");
                                return false;
                            }
                            dataForm.append('g-recaptcha-response',grecaptcha.getResponse());
                        }


                        $.ajax({
                          url: GRFQApp.AppURL+'/quickquote',
                          type: "POST",
                          dataType: 'json',
                          cache: false,
                          contentType: false,
                          processData: false,
                          data: dataForm,
                          crossDomain:true,
                          headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                          success: function(result){
                            if(result.success == true){
                                $('#rfq_product_form').html(result.html);
                                var offsetTop = $('#rfq_product_form').offset().top - (window.innerHeight/2);
                                $('html, body').animate({scrollTop : offsetTop},800);
                            }
                            if(GRFQConfigs.redirectUrl!=undefined&&GRFQConfigs.redirectUrl!=""){
                                setTimeout(function(){
                                    window.location.href = GRFQConfigs.redirectUrl;
                                }, 2000);
                            }
                          },
                          beforeSend: function() {
                            $("#submitRFQForm").attr("disabled", "disabled");
                          },
                          complete: function() {
                            $("#submitRFQForm").removeAttr("disabled");

                          }
                        });

                        return false;
                      }
                    });

                    // Emmit custom event
                    var evt = document.createEvent("Event");
                    evt.initEvent("GRFQ_product_page_loaded",true,true);
                    //invoke
                    document.dispatchEvent(evt);

                  }
                },
              });
            }else if(GRFQConfigs.product_enable == 1){
              var index_form = 0;
              var addtocart_btn = $('.g-atc');
              if($(addtocart_btn).length==0){
                   addtocart_btn = $(GRFQConfigs.selector.addtocart_selector).first();
              }
              var class_by_theme = '';
              if(typeof GRFQConfigs.theme_store_id !== 'undefined'){
                class_by_theme = 'rfq-btn-'+GRFQConfigs.theme_store_id;
                if(GRFQConfigs.theme_store_id == 782){
                  class_by_theme += ' btn--fill btn--regular btn--color';
                }else if(GRFQConfigs.theme_store_id == 578){
                  class_by_theme += ' btn--secondary';
                }
              }
              if($('.button.rfq-btn:not(.rfq-collection-btn-0)').length==0){
                var additional_button_html = '';
                if(GRFQConfigs.shop_url=="foundpop.myshopify.com") additional_button_html = '<svg xmlns="http://www.w3.org/2000/svg" class="foundop-custom-icon" data-name="Layer 1" viewBox="0 0 25 25"><title>FoundPop-Icons</title><path d="M12,0h1V25H12ZM0,13H8.83V12H0Zm16.17-1v1H25V12Z"/></svg>';
                if(GRFQConfigs.shop_url!="jndaudio.myshopify.com" ){
                  if(addtocart_btn.length==0)
                    addtocart_btn = $("form[action*='cart']:visible, form[action*='checkout']:visible").first().find(addtocart_btn);
                  if( $(addtocart_btn).length||GRFQConfigs.shop_url=="tierzerovip.myshopify.com"){
                    $('<button type="button" class="btn button rfq-btn '+class_by_theme+'" onclick="GRFQApp.addProduct(this, '+GRFQConfigs.product.id+')">'+GRFQConfigs.translations.button+additional_button_html+'</button>').insertAfter( $(addtocart_btn) );
                    console.log($(addtocart_btn))
                  }else if($("form[action*='cart'], form[action*='checkout']").length){
                    $("form[action*='cart']:visible, form[action*='checkout']:visible").first().append($('<button type="button" class="btn button rfq-btn '+class_by_theme+'" onclick="GRFQApp.addProduct(this, '+GRFQConfigs.product.id+')">'+GRFQConfigs.translations.button+additional_button_html+'</button>'));
                  }else{
                    $('<button type="button" class="btn button rfq-btn '+class_by_theme+'" onclick="GRFQApp.addProduct(this, '+GRFQConfigs.product.id+')">'+GRFQConfigs.translations.button+additional_button_html+'</button>').insertAfter('select[name="id"]');
                  }
                }
                else {
                  if( $(addtocart_btn).length){
                    $('<button type="button" class="btn btn-primary rfq-btn '+class_by_theme+'" onclick="GRFQApp.addProduct(this, '+GRFQConfigs.product.id+')">'+GRFQConfigs.translations.button+'</button>').insertAfter( $(addtocart_btn) );
                  }else if($("form[action*='cart'], form[action*='checkout']").length){
                    $("form[action*='cart']:visible, form[action*='checkout']:visible").first().append($('<button type="button" class="btn btn-primary rfq-btn '+class_by_theme+'" onclick="GRFQApp.addProduct(this, '+GRFQConfigs.product.id+')">'+GRFQConfigs.translations.button+'</button>'));
                  }else{
                    $('<button type="button" class="btn btn-primary rfq-btn '+class_by_theme+'" onclick="GRFQApp.addProduct(this, '+GRFQConfigs.product.id+')">'+GRFQConfigs.translations.button+'</button>').insertAfter( 'select[name="id"]' );
                  }
                }
              }

            }
          }
        }else if(GRFQApp.getPageType() == 'rfq_page') {


          var quote_id = GRFQ_getCookie(GRFQConfigs.shop_url+"quote.id");

          //Update Qty
          $('body').on('change','.rfq-table input.item_qty',function(){
            	let quote_item_id = $(this).closest('tr').attr('data-id');
              	let url = GRFQApp.AppURL+'/shop/'+GRFQConfigs.shop_url+'/quote_item/'+quote_item_id+'/qty/'+(($(this).val()>0) ? $(this).val() : 1)
              	$.ajax({url: url,success : function(){GRFQApp.UpdateQuoteCart()}});
            	GRFQApp.UpdateTotal()
          })

          var ajax_data = "shop="+GRFQConfigs.shop_url;

          if(GRFQConfigs.customer.name != false)
            ajax_data += "&customer_name="+encodeURIComponent(GRFQConfigs.customer.name);

          if(GRFQConfigs.customer.email != false)
            ajax_data += "&customer_email="+GRFQConfigs.customer.email;

          if(GRFQConfigs.customer.id != false)
            ajax_data += "&customer_id="+GRFQConfigs.customer.id;


          if (typeof quote_id != 'undefined')
            ajax_data += '&quote='+quote_id;
          $.ajax({
            url: GRFQApp.AppURL+"/getmainform",
            dataType: 'jsonp',
            type: "POST",
            data: ajax_data,
            success: function(result){
              if($('body').find(":contains('{rfq_content}')").length){
                var parent_contain = $('body').find(":contains('{rfq_content}')")[$('body').find(":contains('{rfq_content}')").length-1]
                if(parent_contain.tagName == 'SCRIPT' && $('body').find(":contains('{rfq_content}')").length > 1){
                	parent_contain = $('body').find(":contains('{rfq_content}')")[$('body').find(":contains('{rfq_content}')").length-2]
                }
              }
              if(result.success == true){
                if(typeof parent_contain !== 'undefined'){
                  	var parentContent = $(parent_contain).html()
                    parentContent = parentContent.replace("{rfq_content}",result.html);
                  	$(parent_contain).html($('<div class="rfq_form_page">'+parentContent+'</div>'))
                }else {
                    $('.rfq_form_page').html(result.html).promise().done(bindRFQHTML);
                }



				function bindRFQHTML() {
                  // Update Quantity
                  if (GRFQConfigs.shop_url == "foundpop.myshopify.com") {
                      $('body').on('change', '#rfq_form td .item_qty', function() {
                          var qty = $(this).val();
                          var price = $(this).closest('tr').find('.rfq-price').attr('data-price');
                          var subtotal = 0;
                          if (typeof price !== "undefined")
                              subtotal = parseInt(qty) * parseFloat(price);

                            subtotal = subtotal/100
                          $(this).closest('tr').find('.rfq-subtotal').text(subtotal.formatMoney(2, ',', '.'));
                          var quote_item_id = $(this).closest('tr').attr('id');
                          quote_item_id = quote_item_id.replace("item-", "");
                          GRFQApp.UpdateTotal();
                          $.ajax({
                              url: GRFQApp.AppURL + "/update",
                              dataType: 'jsonp',
                              type: "GET",
                              data: {
                                  quantity: qty,
                                  quote_item_id: quote_item_id,
                                  shop_url: GRFQConfigs.shop_url
                              },
                              success: function(result) {
                                  GRFQApp.UpdateQuoteCart();
                              }
                          });
                      });
                  }
                  // Custom for che-event-hire.myshopify.com
                  if (GRFQConfigs.shop_url == "che-event-hire.myshopify.com") {
                      $('body').on('change', '#rfq_form td .item_qty', function() {
                          var row = $(this).closest('tr');
                          var single_price = $(this).val();
                          var qty = row.find('.td_price .rfq-price').text();
                          var subtotal = parseInt(single_price) * parseInt(qty);
                          row.find('.td_subtotal .rfq-subtotal').text(subtotal);
                          GRFQApp.UpdateTotal();
                      });
                  }
                  // Custom for foundpop.myshopify.com
                  if (GRFQConfigs.shop_url == "foundpop.myshopify.com") {
                      // Check if device is Mobile
                      var isMobile = window.matchMedia("only screen and (max-width: 749px)");
                      if (isMobile.matches) {
                          $.each($('.rfq-table tbody tr'), function(key, row) {
                              var price_area = $(this).find('.item_price')
                              if (price_area.length) {
                                  $(this).closest('tr').find('td.cart_meta').append(price_area.html());
                                  price_area.parent().remove();
                              }

                          });
                      } else {
                          loadScript('//unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js', function() {
                              $('#rfq_form').imagesLoaded(function() {
                                  var height_table = $('#rfq_form > table').height();
                                  if (height_table < 200) {
                                      height_table = 200;
                                      $('#rfq_form > table').css('min-height', $('.g-first-left').height() + 1);
                                  }
                                  $('.g-first-left').css('min-height', height_table + 30);
                              });
                          });
                      }

                  }

              }

                /// End bind function

                if( $( ".datepicker" ).length > 0 ){
                  if (typeof jQuery.ui === 'undefined' || GRFQConfigs.shop_url == "vizvi.myshopify.com") {
                    loadScript('//code.jquery.com/ui/1.10.4/jquery-ui.min.js', function(){
                      if(GRFQConfigs.shop_url=='foundpop.myshopify.com'){
                          var today = new Date();
                          var next2week = new Date(today.getFullYear(), today.getMonth(),today.getDate() + 14);
                          $( ".datepicker" ).datepicker({
                            dateFormat: 'd MM, yy',
                            minDate: next2week
                          });
                      }else {
                        $( ".datepicker" ).datepicker({dateFormat: 'd MM, yy'});
                      }
                    });
                  }
                }

                
                // AnhEZ
				
                $('#rfq_form').validator({
                      custom: {
                          filename: function($el) {
                              var str = ''
                              if($el[0].files.length) str = $el[0].files[0].name
                                const regex = /^\..*$/;
                              let m;
                              if ((m = regex.exec(str)) !== null) {
                                return true
                              }
                              return false;
                          },
                          filesize: function($el) {
                            if($el[0].files.length){
                              var size = $el[0].files[0].size/1024/1024
                              var maxSize = $el.attr('data-filesize');
                              if(size > maxSize){
                                return true;
                              }
                            }

                            return false;
                          },
                          fileextension: function($el) {
                            if($el[0].files.length){
                              var allowed_extensions = JSON.parse($el.attr('data-fileextension'));
                              if(allowed_extensions != null){
                                var ext = /^.+\.([^.]+)$/.exec($el[0].files[0].name);
                                ext = ext == null ? "" : ext[1];
                                console.log(ext)
                                if(ext != '' && ext != null && allowed_extensions.indexOf(ext.toLowerCase()) > -1){
                                  return false
                                }else{
                                  return true;
                                }
                              }
                            }
                            return false
                        }
                      }
                  }).on('submit', function (e) {
                  var offsetTop = $('#rfq_form').offset().top - (window.innerHeight/2);
                  var hasClass_disable = $('#submitRFQForm').hasClass('g-disabled');
                  if(e.isDefaultPrevented()||hasClass_disable){
                    	return false;
                  } else {
                    e.preventDefault();
                    $('input[type=file]',$('#rfq_form')).each(function() {
                        var files = $(this).prop('files');
                        if (files != undefined && files.length <= 0) {
                            $(this).removeAttr('name');
                        }
                    });
                    data = new FormData($('form#rfq_form')[0]);
                    if (typeof quote_id != 'undefined')
                      data.append('quote', quote_id);
                    data.append('shop',GRFQConfigs.shop_url);
                    if($("#rfq_form .g-recaptcha").length){
                        if(!grecaptcha.getResponse()){
                            alert("Please verify you are not a robot.");
                            return false;
                        }
                        data.append('g-recaptcha-response',grecaptcha.getResponse());
                    }

                    var csrf = $("input#_token").val();
                    $.ajax({
                      url: $('#rfq_form').attr('action'),
                      type: "POST",
                      dataType: 'json',
                      cache: false,
                      contentType: false,
                      processData: false,
                      data: data,
                      crossDomain:true,
                      success: function(result){
                        if(result.success == true){
                          GRFQ_setCookie(GRFQConfigs.shop_url+"quote.id", { path: '/' },0);
                          $('.rfq_form_page').addClass('text-center').html(result.html);
                        }else {
                          $("#submitRFQForm").val(GRFQConfigs.translations.button);
                          $("#submitRFQForm").removeAttr("disabled").parent().removeClass('g-disabled');
                          $(".submit_error").remove();
                          $('#submitRFQForm').parent().prepend('<div class="submit_error">'+result.html+'</div>');
                        }
                      },
                      beforeSend: function() {
                        if(GRFQConfigs.shop_url=='foundpop.myshopify.com'){
                          //$("#submitRFQForm").attr("disabled", "disabled");
                        }else{
                          $("#submitRFQForm").attr("disabled", "disabled").parent().addClass('g-disabled');
                        }
                        $("#submitRFQForm").val(GRFQConfigs.translations.pagesubmitting);
                      },
                      complete: function(data) {
                      if((JSON.parse(data.responseText)).success == true){
                        $("#submitRFQForm").val(GRFQConfigs.translations.button);
                        $("#submitRFQForm").removeAttr("disabled").parent().removeClass('g-disabled');
                        if(offsetTop<0) offsetTop = 0;
                        $('html, body').animate({scrollTop : offsetTop},800);
                        if(GRFQConfigs.redirectUrl!=undefined&&GRFQConfigs.redirectUrl!=""){
                            setTimeout(function(){
                                window.location.href = GRFQConfigs.redirectUrl;
                            }, 2000);
                        }

                      }
                    }
                    });
                    return false;
                  }
                });

                // Emmit custom event
                var evt = document.createEvent("Event");
                evt.initEvent("GRFQ_quote_page_loaded",true,true);
                //invoke
                document.dispatchEvent(evt);
              }
            },
          });
        }else if(GRFQApp.getPageType() == 'rfq_history' || GRFQApp.getPageType() == 'account' ) {
          if($('.rfq_history_page').length || $('body').find(":contains('{rfq_history}')").length){
          	if(GRFQConfigs.customer.id != false){
              $.ajax({
                url: GRFQApp.AppURL+"/history",
                dataType: 'jsonp',
                type: "POST",
                data: "customer="+GRFQConfigs.customer.id+"&shop="+GRFQConfigs.shop_url,
                success: function(result){
                  if($('body').find(":contains('{rfq_history}')").length){
                    var parent_contain = $('body').find(":contains('{rfq_history}')")[$('body').find(":contains('{rfq_history}')").length-1]
                  }
                  if(result.success){
                    if(typeof parent_contain !== 'undefined'){
                        var parentContent = $(parent_contain).html()
                        parentContent = parentContent.replace("{rfq_history}",result.html);
                        $(parent_contain).html($('<div class="rfq_form_page">'+parentContent+'</div>'))
                    }else {
                        $('.rfq_history_page').html(result.html);
                    }
                    // Emmit custom event
                    var evt = document.createEvent("Event");
                    evt.initEvent("GRFQ_history_page_loaded",true,true);
                    //invoke
                    document.dispatchEvent(evt);
                  }
                }
              });
            }else{
              if(($('body').find(":contains('{rfq_history}')").length || $('.rfq_history_page').length) && GRFQConfigs.settings.historylogin != null){
                var parent_contain = $('body').find(":contains('{rfq_history}')")[$('body').find(":contains('{rfq_history}')").length-1]
                if(typeof parent_contain !== 'undefined'){
                    var parentContent = $(parent_contain).html()
                    parentContent = parentContent.replace("{rfq_history}",GRFQApp.replaceLinkCode(GRFQConfigs.settings.historylogin,"login"));
                    $(parent_contain).html($('<div class="rfq_form_page">'+parentContent+'</div>'))
                }else {
                    $('.rfq_history_page').html(GRFQApp.replaceLinkCode(GRFQConfigs.settings.historylogin,"login"));
                }
              }
              if(typeof GRFQConfigs.settings !== undefined && typeof GRFQConfigs.settings.historylogin !== undefined && GRFQConfigs.settings.historylogin != null){
                
              }else{
                window.location.href = "/account/login?checkout_url="+window.location.href;
              }
            }
          }
        }



        if( GRFQConfigs.collection_enable == true ){

          $('.rfq-collection-script').each(function(){

            var id_product = $(this).data('id');
            var is_disabled = !GRFQApp.isEnabled(GRFQCollection[id_product])

            var rfq_btn = $(this).closest('div').find('.button.rfq-btn');
            if( is_disabled == false && $(rfq_btn).length==0)
              $('<button class="btn button rfq-btn rfq-collection-btn-'+GRFQConfigs.theme_store_id+'" onclick="return GRFQApp.add(this, '+id_product+')">'+GRFQConfigs.translations.button+'</button>').insertAfter(this);
          });
        }
      }

      if(typeof GRFQConfigs.theme_store_id !== 'undefined' && GRFQConfigs.theme_store_id == 782){
        $('button.rfq-btn').addClass('btn--fill btn--regular btn--color');
      }

  }
  GRFQApp.replaceLinkCode = function(initialStr,code){
  	var anchor = '';
    var regex_replace = /{.*}/;
    var m_replace = regex_replace.exec(initialStr)

    if(m_replace && m_replace.length){
          code = m_replace[0]
          const regex_type = /[^\{]+(?=\|)/g;
          var m_type = regex_type.exec(initialStr)

          const regex_trans = /[^\|]+(?=\})/g;
          var m_trans = regex_trans.exec(initialStr)
          if(m_type[0] == 'login' && m_trans[0] != ''){
            	anchor = '<a href="#" style="text-decoration: underline;" class="login" onclick="gotoLogin(event)">'+m_trans[0]+'</a>'
                gotoLogin = function (event){
                    event.preventDefault()
                    window.location.href = "/account/login?checkout_url="+window.location.href;
                }
          }
    }
    return initialStr.replace(code, anchor);
  }
  GRFQApp.add = function(el, product_id){

    var product_name = GRFQCollection[product_id].title;


    // Custom AnhEz
    var option = "";
    if(GRFQConfigs.shop_url == "airbag-man-suspension.myshopify.com"){
      option = $(el).closest('div.product__inside').find('div.hidden div.rfq_collection div.title').text();
      if(option=="") option = $('#pageContent div.hidden div.rfq_collection div.title').text();
      option = option.replace("Air bag suspension for" , "");

      var productDetail = "";
      var listDetail = $(el).closest('div.product__inside').find('div.hidden div.rfq_collection div.detail ul.vpdetails > li');
      if(listDetail.length==0){
        listDetail = $("#pageContent div.hidden div.rfq_collection div.detail ul.vpdetails > li");

      }
      $.each(listDetail,function(k,line){
        productDetail += "<li class='bullet'>"+$(line).text()+"</li>";
      });
      option = encodeURIComponent("<span class='main_option'> "+option+"</span>"+"<br><b>Product/Vehicle Details:</b><br><ul class='product_detail'>"+productDetail+"</ul>");
    }
    if(GRFQConfigs.shop_url == "pasartap.myshopify.com"){
    	var variant_id = null;
      	var variant_title = null;
        if(GRFQCollection[product_id].variants[0].id) variant_id =  GRFQCollection[product_id].variants[0].id;
    	if(GRFQCollection[product_id].variants[0].title) variant_title = GRFQCollection[product_id].variants[0].title;
    	var qty = 0;
        if(parseInt($(el).closest('div.product-list-item').find('input.qty').val())>0) qty =  parseInt($(el).closest('div.product-list-item').find('input.qty').val());
    }
    // Custom AnhEz
	
	// Variant
    var variant_id = $(el).closest('form').find('[name="id"]').val();

    // Quantity
    var quantity = $(el).closest('form').find('[name="quantity"]').val();

    if(typeof quantity !== 'undefined') qty = quantity

    if (GRFQCollection[product_id].featured_image != null)
    product_image = GRFQCollection[product_id].featured_image;
    else if (GRFQCollection[product_id].images[0])
        product_image = GRFQCollection[product_id].images[0].src;
    else
        product_image = '';
    var product_url = '';
	if( GRFQCollection[product_id].handle != null )
      product_url = "//"+GRFQConfigs.shop_url+"/products/"+GRFQCollection[product_id].handle;

    var add_data = 'product_id='+product_id+'&name='+encodeURIComponent(product_name)+'&image='+product_image+'&product_url='+product_url+'&option='+option+'&shop='+GRFQConfigs.shop_url;
    if(typeof variant_id !== 'undefined'){
    	add_data += '&variant_id='+variant_id;
        for(var i=0;i<GRFQCollection[product_id].variants.length;i++){
            if(GRFQCollection[product_id].variants[i].id == variant_id){
            	var variant_title = GRFQCollection[product_id].variants[i].title
            }
        }
        if(typeof variant_title !== 'undefined'){
        	add_data += '&option='+variant_title;
        }
    }
    
    if(qty&&qty>0) add_data += '&qty='+qty;
    // Check if Product has price
//     var priceSelector = $("#productPrice,span.money,#ProductPrice span.mw-price");
    var price = 0;
    price = GRFQCollection[product_id].price;
    if(typeof GRFQCollection[product_id].price === 'undefined'){
    	if(GRFQCollection[product_id]&&GRFQCollection[product_id].price){
          if(priceSelector.length==1&&typeof options !== 'string') price = parseFloat((priceSelector.html()).replace(/\D+/g, ''));
          else price = GRFQCollection[product_id].price;
          if(typeof $(priceSelector).attr('data-mw-orig-price')!=='undefined') price = $(priceSelector).attr('data-mw-orig-price');
        }else if(GRFQCollection[product_id]&&GRFQCollection[product_id].price_min){
        	price = GRFQCollection[product_id].price_min
        }
    }
    if(typeof forceRFQPrice !== 'undefined'){
      price = forceRFQPrice
    }
     add_data += '&price='+price;
    var vendor = GRFQCollection[product_id].vendor;
    if(vendor!='') add_data += "&vendor="+vendor;
    var sku = GRFQCollection[product_id].variants["0"].sku;
    if(sku!='') add_data += "&sku="+sku;
    var quote_id = GRFQ_getCookie(GRFQConfigs.shop_url+"quote.id");

    if (typeof quote_id != 'undefined')
      add_data += '&quote='+quote_id;
    console.log(add_data);
    $.ajax({
      url: GRFQApp.AppURL+"/add",
      type: "GET",
      dataType: 'jsonp',
      data: add_data,
      success: function(response) {
        console.log(response);
        if(response.success == true){

          GRFQ_setCookie(GRFQConfigs.shop_url+"quote.id", response.quote, { expires: 7, path: '/' });
          if(GRFQConfigs.shop_url=='textile-technologies-europe-ltd.myshopify.com'||GRFQConfigs.shop_url=='dev-nassauelectrical.myshopify.com'||GRFQConfigs.shop_url=='sunstatebrp18.myshopify.com'||GRFQConfigs.shop_url=='sunstatemc.myshopify.com'||GRFQConfigs.shop_url=='j-carp.myshopify.com'||GRFQConfigs.shop_url=='inflataad.myshopify.com'|| GRFQConfigs.shop_url == 'uiisii.myshopify.com'||GRFQConfigs.shop_url=='artwork-by-adrianne.myshopify.com'){
            window.location.href = '//'+GRFQConfigs.shop_url+'/pages/'+GRFQConfigs.rfq_page;
          	return false;
          }
          $("body").append(response.html);
          console.log(response.html);
          $('.rfq_overlay').fadeIn();
          $('#rfq_continue_shopping, #close_rfq_popup').click(function(){
            $('.rfq_overlay').fadeOut(300, function(){
              $('.rfq_overlay').remove();
            });
          });
          //AnhEz
          GRFQApp.UpdateQuoteCart();
          //
        }
      },
      beforeSend: function() {
        $(el).attr("disabled", "disabled");
      },
      complete: function() {
        $(el).removeAttr("disabled");
      }
    });
    return false;
  }

  GRFQApp.addProduct = function(el, product_id,product=false){
    var targetProduct = GRFQConfigs.product
    if(product !== false){
      targetProduct = product
    }
    var add_data = 'product_id='+product_id+'&shop='+GRFQConfigs.shop_url;

    var form = $(el).closest('form');
    var variant_selector =  form.find('[name=id]');

    if($(variant_selector).length > 0){
      if($(variant_selector).length > 1){
        var variant_id = form.find('[name=id]:checked').val();
      }else{
        var variant_id = $(variant_selector).val();
      }
      // SKU
      if(variant_id){
        var sku = '';
        $.each(targetProduct.variants,function(key,item){
          if(item.id==variant_id){
            sku = item.sku;
          }
        });
        if(sku) add_data += '&sku='+sku;
      }

      if(variant_id != null){
      	add_data += '&variant_id='+variant_id;
      }
    }
    var vendor = targetProduct.vendor;
    if(vendor!='') add_data += "&vendor="+vendor;

    // Quantity
    var qty = 1
    var quantity = $(el).closest('form').find('[name="quantity"]').val();

    if(typeof quantity !== 'undefined') qty = quantity

    add_data += '&qty='+qty;

    add_data += '&name='+encodeURIComponent(targetProduct.title);

    var options = "";

    var quote_id = GRFQ_getCookie(GRFQConfigs.shop_url+"quote.id");
    if (typeof quote_id != 'undefined')
      add_data += '&quote='+quote_id;

  var wrong_variant = true;
    var variant_object;
    $.each(targetProduct.variants, function(i, variant){
      if( variant.id == variant_id ){
        wrong_variant = false;
        variant_object = variant;
        if(variant.title.indexOf('Default') == -1)
          options = variant.title;

        if( variant.featured_image != null ){
          add_data += '&image='+variant.featured_image.src;
        }else if( targetProduct.featured_image != null ){
          add_data += '&image='+targetProduct.featured_image;
        }else{

          add_data += '&image='+targetProduct.images[0];
        }
        targetProduct.selected_or_first_available_variant = variant_object
      }

    });
    if(wrong_variant){
      add_data += '&image='+targetProduct.featured_image;
    }
	// Get URL
    var product_url = '';
    if(targetProduct&&targetProduct.handle!=null){
      product_url = '//'+GRFQConfigs.shop_url+'/products/'+targetProduct.handle;
    	if(!wrong_variant){
    		product_url += '?variant='+variant_id;
    	}
    }

    add_data += '&product_url='+product_url;

    console.log("option has value is : "+options);
    if(options=="default title"||options=="Default Title") options='';
    if(GRFQConfigs.shop_url=='textile-technologies-europe-ltd.myshopify.com'){
     	var selectlist = $(form).find('select.single-option-selector');
      if (selectlist&&selectlist.length>0){
        var options_prop = {};
        $.each(selectlist,function(k,select){
          options_prop[k] = {};

          var label = $(select).siblings('label').text().trim();
          var selected = $(select).find(':selected').text();
          options_prop[k].name = label+selected;
        });
        options = options_prop;
      }
    }
    var boldPrice
    if ($(el).closest('form').find('[name^="properties"]').length) {
        
          var properties = {};
          if(options!=""){
            if(typeof options  !== 'string'){
            	$.each(JSON.parse(JSON.stringify(options)),function(k,v){
                  properties[k] = {};
                  properties[k].name = v.name;
                });
            }
            else
              properties["Variant"] = {"name":options};
          }
          $.each($(el).closest('form').find('[name^="properties"]').serializeArray(), function(i, input){
            if(input.name.indexOf('properties[_') > -1){
                if(input.name === 'properties[_boldVariantPrices]'){
                  	var prices = input.value.split(',')
                    boldPrice = typeof targetProduct.selected_or_first_available_variant !== 'undefined' ? targetProduct.selected_or_first_available_variant.price : targetProduct.price
                    for( var i=0;i<prices.length;i++){
                    	boldPrice += parseInt(prices[i])
                    }
                	
                }
            	return true;
            }
            if(input.value&&input.value!=''){
            	var k = input.name.replace('properties[', '').replace(']', '');
                properties[k] = {};
                properties[k].name = k+': '+input.value;
            }
          });
          options = properties;
          if($('.pricing-info-total-price').length){
            var w3Qty = parseInt($('[name="quantity"]').val())
            var w3Price = Number($('.pricing-info-total-price').text().replace(/[^0-9.-]+/g,""))
            if(w3Qty !== NaN && w3Qty){
                w3Price = (w3Price/w3Qty)*100
            }
          }
        
      }
	console.log(options)
      //     Metafield
    if($('.rfq-metafields-wrapper').length && typeof options === 'string'){

      var metafields = encodeURIComponent($('.rfq-metafields-wrapper').html())
    	options += metafields;
    }
    if(typeof options === 'string' && options == ''){
      $(form).find('select:visible').each(function(index,item){
        var slash = ' / '
        if(index == 0) slash = ''
      	options += slash+$(item).val()
      })
    }
     // Check if Product has price
    var priceSelector = $(GRFQConfigs.selector.price_selector);
    if(priceSelector.length>0||targetProduct.price){
      var price = 0;
      if(typeof variant_object !== 'undefined' && variant_object) price = variant_object.price
      else if(typeof targetProduct.selected_or_first_available_variant !== 'undefined'){
        price = targetProduct.selected_or_first_available_variant.price
      }
      else price =  targetProduct.price;
      if(typeof $(priceSelector).attr('data-mw-orig-price')!== 'undefined') price = $(priceSelector).attr('data-mw-orig-price');
      if(priceSelector.length==1&&typeof options !== 'string') price = parseFloat((priceSelector.html()).replace(/\D+/g, ''))*100;
      if(typeof boldPrice !== 'undefined' && boldPrice>0) {price = boldPrice };
      if(typeof w3Price !== 'undefined' && w3Price>0) {price = w3Price };
      if(typeof forceRFQPrice !== 'undefined'){
        price = forceRFQPrice
      }
      add_data += '&price='+price;
    }
    if(typeof options !== 'string')
      options = JSON.stringify(options);
    if(options!='""'||options!=''){
      	var find = '&';
        var re = new RegExp(find, 'g');
      	var find = ' ';
        var ra = new RegExp(find, 'g');
    	add_data += '&option='+options.replace(re, "%26").replace(ra, "%20");

      	var sharp = new RegExp('#', 'g');
      	add_data = add_data.replace(sharp, "");
    }
    console.log(add_data);
    $.ajax({
      url: GRFQApp.AppURL+'/add',
      type: "GET",
      dataType: 'jsonp',
      data: add_data,
      success: function(response) {
        if(response.success == true){
          GRFQ_setCookie(GRFQConfigs.shop_url+"quote.id", response.quote, { expires: 7, path: '/' });
          if(GRFQConfigs.shop_url=='textile-technologies-europe-ltd.myshopify.com'||GRFQConfigs.shop_url=='dev-nassauelectrical.myshopify.com'||GRFQConfigs.shop_url=='sunstatebrp18.myshopify.com'||GRFQConfigs.shop_url=='sunstatemc.myshopify.com'||GRFQConfigs.shop_url=='j-carp.myshopify.com'||GRFQConfigs.shop_url=='inflataad.myshopify.com'|| GRFQConfigs.shop_url == 'uiisii.myshopify.com'|| GRFQConfigs.shop_url == 'artwork-by-adrianne.myshopify.com' ){
            window.location.href = '//'+GRFQConfigs.shop_url+'/pages/'+GRFQConfigs.rfq_page;
          	return false;
          }
          $("body").append(response.html);
          $('.rfq_overlay').fadeIn();
          $('#rfq_continue_shopping, #close_rfq_popup').click(function(){
            $('.rfq_overlay').fadeOut(300, function(){
              $('.rfq_overlay').remove();
            });
          });
        }
      },
      beforeSend: function() {
        $(el).attr("disabled", "disabled");
      },
      complete: function() {
        $(el).removeAttr("disabled");
        GRFQApp.UpdateQuoteCart();
      }
    });
  }

  GRFQApp.addCustom = function(el, product_id,product_name,product_option,product_image){
    console.log(GRFQConfigs.shop_url);
    var add_data = 'product_id='+product_id+'&name='+product_name+'&image='+product_image+'&option='+product_option+'&shop='+GRFQConfigs.shop_url;

    var quote_id = GRFQ_getCookie(GRFQConfigs.shop_url+"quote.id");

    if (typeof quote_id != 'undefined')
      add_data += '&quote='+quote_id;

    $.ajax({
      url: GRFQConfigs.app_url+"/add",
      type: "GET",
      dataType: 'jsonp',
      data: add_data,
      success: function(response) {
        if(response.success == true){

          GRFQ_setCookie(GRFQConfigs.shop_url+"quote.id", response.quote, { expires: 7, path: '/' });

          $("body").append(response.html);
          $('.rfq_overlay').fadeIn();
          $('#rfq_continue_shopping, #close_rfq_popup').click(function(){
            $('.rfq_overlay').fadeOut(300, function(){
              $('.rfq_overlay').remove();
            });
          });
          //AnhEz
          GRFQApp.UpdateQuoteCart();
          //
        }
      },
      beforeSend: function() {
        $(el).attr("disabled", "disabled");
      },
      complete: function() {
        $(el).removeAttr("disabled");
      }
    });
  }
  GRFQApp.viewQuote = function(quote_id){
    $.ajax({
      url: GRFQApp.AppURL+"/viewquote",
      dataType: 'jsonp',
      type: "POST",
      data: "id="+quote_id+"&shop="+GRFQConfigs.shop_url,
      beforeSend: function() {
        $('body, html').animate({scrollTop: $('#quote-preview').offset().top },300);
        $('#quote-preview #quote-preview-loaded').slideUp(150, function(){
          $('#quote-preview #quote-preview-loaded').html("");
          $('#quote-preview #loading-mask').show(150);
        });
      },
      success: function(result){
        $('#quote-preview #loading-mask').hide(150,function(){
          $('#quote-preview #quote-preview-loaded').html(result.html).slideDown(150);
        });
      },
    });
    return false;
  };

  GRFQApp.remove = function(el, item_id){

    var data = "shop="+GRFQConfigs.shop_url+"&item_id="+parseInt(item_id);
    var quote_id = GRFQ_getCookie(GRFQConfigs.shop_url+"quote.id");
    if (typeof quote_id != 'undefined')
      data += '&quote='+quote_id;

    $.ajax({
      url: GRFQApp.AppURL+"/delete",
      type: "GET",
      dataType: 'jsonp',
      data: data,
      success: function(response){
        if(response.success == true){

          GRFQ_setCookie(GRFQConfigs.shop_url+"quote.id", response.quote, { expires: 7, path: '/' });
		  var last_row_h = $('#item-'+parseInt(item_id)).height();
          $('#item-'+parseInt(item_id)).fadeOut(150, function(){
            $('#item-'+parseInt(item_id)).remove();
            GRFQApp.updateRows()
            GRFQApp.UpdateTotal();
            UpdatePrice();
          })
          // if(GRFQConfigs.shop_url=="restaurant-furniture-depot.myshopify.com"){
          //   $(el).closest('tr').fadeOut(150, function(){
          //     $(el).closest('tr').remove();
          //   })
          // }

          if(response.html != ''){
            $('.rfq_form_page').html(response.html);
          }
          //AnhEz
          GRFQApp.UpdateQuoteCart();
          //
          // foundpop.myshopify.com
          if(GRFQConfigs.shop_url=="foundpop.myshopify.com"){
                var height_table = $('#rfq_form > table').height()-last_row_h;
            	var height_left = $('.g-first-left').height();
                if (height_table<200) {
                    height_table = 200;
                    $('#rfq_form > table').css('min-height',$('.g-first-left').height()+1);
                }
                if(height_left>height_table){
                    height_table = height_left-50;
                  	$('#rfq_form > table').css('min-height',height_table);
                }


            	setTimeout(function () {
                    $('.g-first-left').css('min-height',height_table+30);
                 }, 150);

          }

        }
      },
      beforeSend: function() {
        $(el).attr("disabled", "disabled");
      },
      complete: function() {
        $(el).removeAttr("disabled");
      }
    });
  }

  GRFQApp.getPageType = function(){
    var url = window.location.toString();
    if(url.match(/\/products\//) !== null || url.match(/\/products_preview/) !== null){
      return 'product';
    }else if(url.match(/\/cart/) !== null){
      return 'cart';
    }else if(url.match(/\/collections\//) !== null){
      return 'collection';
    }else if(url.match(/\/account/) !== null){
      return 'account';
    }else if(url.match(/\/pages\//) !== null){
      if( url.indexOf(GRFQConfigs.rfq_page) !== -1 )
        return 'rfq_page';
      else if( url.indexOf(GRFQConfigs.rfq_history) !== -1 )
        return 'rfq_history';
      else if(typeof forceRFQCollectionPage !== 'undefined')
        return 'collection'
      else if(typeof forceRFQProductPage !== 'undefined')
        return 'product'
      else
        return 'page';
    }else if(url.match(/\/search\?/) !== null){
      return 'search';
    }else{
      return '';
    }
  };
  // AnhEz
  GRFQApp.UpdateQuoteCart = function(){
    var quote_id__ = GRFQ_getCookie(GRFQConfigs.shop_url+"quote.id");
      $.ajax({
        url: GRFQApp.AppURL+"/numitem",
        type: "GET",
        dataType: "jsonp",
        data: '&quote_id='+quote_id__,
        success: function(result){
          $(".quotecounter .bigquotecounter").text(result.numberofenquiry);
          $(".cart-icon .quotecount").text(result.numberofenquiry);
          $(".cart-icon .count").text(result.numberofenquiry);
          $('[id="quoteCount"]').text(result.numberofenquiry);
          $(".quoteCount").text(result.numberofenquiry);
          $('.g-quote-item span.g-badge').text(result.numberofenquiry);
          $('.medium-up--hide.small--one-half .site-header__cart span.quotecount').text(result.numberofenquiry);
          if(result.numberofenquiry==0){
            // $('.g-quote-item span.g-wrapper-badge , .medium-up--hide.small--one-half .site-header__cart span.quotecount-wrapper').css('display','none');
            $(".quoteCount").css('display','none');
          }else {
            $('.g-quote-item span.g-wrapper-badge , .medium-up--hide.small--one-half .site-header__cart span.quotecount-wrapper').css('display','');
            $(".cart-icon .count, #quoteCount,.quoteCount").css('display','');
          }
        }
      });
  };
  GRFQApp.UpdateTotal = function () {
    	function convertNumber(num){
          var t = '';
          for(var i = 0 ; i<num.length;i++){
          	if(num[i]=='.') t += '';
            else if(num[i]==',') t += '.';
            else
              t += num[i];
          }
          return t;
        }
      if(GRFQConfigs.shop_url=="che-event-hire.myshopify.com"){
          var rows = $('table.rfq-table tbody tr');
          if(rows.length){
              var total = 0;
              $.each(rows,function(k,row){
                  total += parseFloat(parseFloat($(row).find('.rfq-subtotal').text()).toFixed(2));
              });
              if(GRFQConfigs.shop_url=='promoland-test.myshopify.com') total+= parseFloat(parseFloat(total*0.25).toFixed(2));
              $('#rfq_form .rfq-total').text(parseFloat(parseFloat(total).toFixed(2)));
          }
      }
      if(GRFQConfigs.shop_url=="promoland-test.myshopify.com"){
      	var rows = $('table.rfq-table tbody tr');
          if(rows.length){
              var total = 0;
              $.each(rows,function(k,row){
                  var price = $(row).find('.rfq-price').attr('data-price')
                  var qty = $(row).find('.item_qty').val()
                  total += parseFloat(convertNumber($(row).find('.rfq-subtotal').text()));
                  $(row).find('.rfq-subtotal').text(((qty*parseInt(price))/100).toFixed(2).replace(".", ","))
              });
              $('#rfq_form .rfq-total').text((total/100).toFixed(2).replace(".", ","));
          }
      }
      if(GRFQConfigs.shop_url=="prinsa-mx.myshopify.com"||GRFQConfigs.shop_url=="industralia-mexico.myshopify.com"){
      		var rows = $('table.rfq-table tbody tr')
            if(rows.length){
            	var total = 0
                $.each(rows,function(k,row){
                    $(row).find('.rfq-subtotal .amount').text(((convertNumber($(row).find('input.item_qty').val())*parseFloat(convertNumber($(row).find('.rfq-price').attr('data-price'))))/100).formatMoney(2, '.', ','))
                    total += convertNumber($(row).find('input.item_qty').val())*parseFloat(convertNumber($(row).find('.rfq-price').attr('data-price')))
                });
              	$('#rfq_form .rfq-total .amount').text((total/100).formatMoney(2, '.', ','))
            }
      }

  };
   GRFQApp.updateRows = function (){
      	var total = 0;
        $('.rfq-table tbody tr').each(function(index,item){
          	var qty = $(item).find('.item_qty').val()
            var price = $(item).find('.rfq-price').attr('data-price')
        	total += qty*parseInt(price)
            var moneyFomart= $(item).find('.rfq-subtotal').siblings('.rfq_money_formart')
            if(moneyFomart.length){
              	$(item).find('.rfq-subtotal').text(((qty*parseInt(price))/100).toFixed(2))
            }else{
            	$(item).find('.rfq-subtotal').text(GRFQConfigs.money_format+' '+((qty*parseInt(price))/100).toFixed(2))
            }
            
        })
        $('#rfq_form').find('.rfq-total').text(GRFQConfigs.money_format+' '+(total/100).toFixed(2))
    }
  GRFQApp.UpdateQuantity = function (quote_item_id,qty) {
      $.ajax({
        url: "https://"+GRFQApp.AppURL+"/updateqty",
        type: "GET",
        dataType: "jsonp",
        data: '&quote_item_id='+quote_item_id+'&qty='+qty,
        success: function(result){

        }
      });
  };
  GRFQApp.isEnabled = function (product) {
    let is_enable = false
    if(GRFQConfigs.rules && typeof GRFQConfigs.rules.all !== "undefined" && GRFQConfigs.rules.all.enable&&!is_enable){
      return true;
    }
    if(GRFQConfigs.rules.manual.enable){
      	let manual_products= GRFQConfigs.rules.manual.manual_products.split(',')
        if(manual_products.indexOf(product.id+'') > -1){
        	is_enable = true;
        }
	}
    if(GRFQConfigs.rules.automate.enable&&!is_enable && typeof GRFQConfigs.rules.automate.automate_rule !== 'undefined' ){
    	let res = []
        for(var i = 0 ; i < GRFQConfigs.rules.automate.automate_rule.length ;i++){
        	let r = GRFQConfigs.rules.automate.automate_rule[i]
            let field,match = false
            switch(r.select) {
              case "TITLE":
        			field = "title"
                  break;
              case "TYPE":
					field = "type"
                  break;
              case "VENDOR":
					field = "vendor"
                  break;
              case "PRICE":
					field = "price"
                  break;
              case "TAG":
					field = "tags"
                  break;
              case "COLLECTION":
					field = "collection"
                  break;
              case "VARIANT_COMPARE_AT_PRICE":
					field = "compare_at_price"
                  break;
              case "VARIANT_WEIGHT":
					field = "compare_at_price"
                  break;
              case "VARIANT_INVENTORY":
					field = "compare_at_price"
                  break;
              case "VARIANT_TITLE":
					field = "compare_at_price"
                  break;
              default:

            }

          	switch(r.where) {
              case "EQUALS":
                  if(field == 'tags' || field == 'collection'){
                  		match = (product[field].indexOf(r.value) > -1)
                  }else
        				match = (product[field] == r.value);
                  break;
              case "NOT_EQUALS":
					match = (product[field] != r.value)
                  break;
              case "GREATER_THAN":
                	if(field=="price")
                      match = (parseFloat(product[field]) > parseFloat(r.value)*100);
                	else
                      match = (parseFloat(product[field]) > parseFloat(r.value));
                  break;
              case "LESS_THAN":
					if(field=="price")
                      match = (parseFloat(product[field]) < parseFloat(r.value)*100);
                	else
                      match = (parseFloat(product[field]) < parseFloat(r.value));
                  break;
              case "STARTS_WITH":
					match = (product[field].startsWith(r.value));
                  break;
              case "ENDS_WITH":
					match = (product[field].endsWith(r.value));
                  break;
              case "CONTAINS":
					match = (product[field].indexOf(r.value) > -1);
                  break;
              case "NOT_CONTAINS":
					match = (product[field].indexOf(r.value) == -1);
                  break;
              default:

            }
          	res.push(match)
        }
      if(res.length){
        is_enable = res[0];
        for( var i = 1 ; i < res.length ; i++ ){
            if(GRFQConfigs.rules.automate.automate_operator=="and"){
            	is_enable = is_enable && res[i]
            }else{
            	is_enable = is_enable || res[i]
            }
        }
      }
    }
    console.log(product.title+'---'+is_enable)
    return is_enable
  };
  Number.prototype.formatMoney = function(c, d, t){
          var n = this,
          c = isNaN(c = Math.abs(c)) ? 2 : c,
          d = d == undefined ? "." : d,
          t = t == undefined ? "," : t,
          s = n < 0 ? "-" : "",
          i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
          j = (j = i.length) > 3 ? j % 3 : 0;
         return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
  };
  Object.size = function(obj) {
      var size = 0, key;
      for (key in obj) {
          if (obj.hasOwnProperty(key)) size++;
      }
      return size;
  };
  //

    if( typeof jQuery === 'undefined' || (jQuery.fn.jquery.split(".")[0] < 2 && jQuery.fn.jquery.split(".")[1] < 7)){
      var doNoConflict = true;
      if (typeof jQuery === 'undefined') {doNoConflict = false;}
      loadScript('//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js', function(){
        if (doNoConflict) {
          jQuery17 = jQuery.noConflict(true);
        } else {
          jQuery17 = jQuery;
        }
        GRFQApp.init(jQuery17)
      });
    } else {
      GRFQApp.init(jQuery);
    }


})();
