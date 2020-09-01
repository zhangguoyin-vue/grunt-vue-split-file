/*
 * grunt-vue-split-file
 * https://github.com/zhang/grunt-vue-split-file
 *
 * Copyright (c) 2020 zhangguoyin
 * Licensed under the MIT license.
 */

'use strict';
function getXmlContent(str, splitStr) {
    let tempStr = "";
    if (str && splitStr) {
        let tempIndex = str.indexOf("<" + splitStr);
        let tempEnd = str.indexOf("</" + splitStr + ">");
        let tempNum = ("</" + splitStr + ">").length
        if (tempIndex != -1 && tempEnd != -1) {
            tempStr = str.substring(tempIndex, tempEnd + tempNum);
        }
    }
    return tempStr;
}

function getXmlHead(str) {
    let tempStr = "";
    if (str) {
        let strSpltList = str.split(">");
        if (strSpltList && strSpltList.length > 0) {
            tempStr = strSpltList[0] + ">";
        }
    }
    return tempStr;
}

function getStyleHeadReplaceSplit(str) {
    let splitStrList = [" ", "\"", "'"];
    let tempStrList = [];
    if (str) {
        let strLsit = str.split('');
        if (strLsit && strLsit.length > 0) {
            strLsit.forEach(function (item) {
                if (!splitStrList.includes(item)) {
                    tempStrList.push(item);
                }
            });
        }
    }
    let tempStr = tempStrList.join("");
    return tempStr.toLowerCase();
}

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('vue_split_file', 'The best Grunt plugin ever.', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            excepts: []  //数组的路径不参与VUE文件分割处理
        });
        var fileJsJsonList = [];
        var flieRootPath = "";
        // Iterate over all specified file groups.
        this.files.forEach(function (f) {
            // Concat specified files.
            
            if (!flieRootPath) {
                var pathList9 = f.orig.dest.split("/");
                flieRootPath = pathList9[0] + "/";
            }
            var src = f.src.filter(function (filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else if (options.excepts.includes(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" no need to build.');
                    return false;
                } else {
                    return true;
                }
            }).map(function (filepath) {
                // Read file source.
                return grunt.file.read(filepath);
            }).join('');

            if (src && src.length > 0) {
                let templateContent = getXmlContent(src, "template");
                let scriptStr = getXmlContent(src, "script");
                let styleStr = getXmlContent(src, "style");

                let scriptHead = getXmlHead(scriptStr);
                let styleHead = getXmlHead(styleStr);
                let scriptContent = scriptStr.replace(scriptHead, "").replace("</script>", "");
                let styleContent = styleStr.replace(styleHead, "").replace("</style>", "");

                let destFileName = f.dest;
                let excEnd = f.dest.lastIndexOf(".");
                if (excEnd != -1) {
                    destFileName = f.dest.substring(0, excEnd);
                }

                let tempJsFileName = destFileName + ".js";
                let tmpLogMode = {
                    jsFlieName: tempJsFileName,
                    fileNameList: []
                };
                if (templateContent && templateContent.length > 0) {
                    let tempHtmlFileName = destFileName + ".html";
                    grunt.file.write(tempHtmlFileName, templateContent);
                    tmpLogMode.fileNameList.push(tempHtmlFileName);
                }
                if (scriptContent && scriptContent.length > 0) {
                    grunt.file.write(tempJsFileName, scriptContent);
                    tmpLogMode.fileNameList.push(tempJsFileName);
                }
                if (styleContent && styleContent.length > 0) {
                    let styleHeadReplace = getStyleHeadReplaceSplit(styleHead);
                    console.log(styleHeadReplace);
                    let styleExt = ".css";
                    if (styleHeadReplace.indexOf("lang=less") != -1) {
                        styleExt = ".less";
                    }
                    if (styleHeadReplace.indexOf("lang=stylus") != -1) {
                        styleExt = ".stylus";
                    }
                    let styleFileName = destFileName + styleExt;
                    grunt.file.write(styleFileName, styleContent);
                    tmpLogMode.fileNameList.push(styleFileName);
                }
                fileJsJsonList.push(tmpLogMode);
            }
        });
        if (flieRootPath && flieRootPath.length > 0 && fileJsJsonList && fileJsJsonList.length > 0) {
            console.log(flieRootPath);
            grunt.file.write(flieRootPath + "vueSplitLog.json", JSON.stringify(fileJsJsonList));
        }
    });

};
