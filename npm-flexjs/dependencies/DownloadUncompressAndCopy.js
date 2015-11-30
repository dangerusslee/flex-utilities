/*
 *
 *  Licensed to the Apache Software Foundation (ASF) under one or more
 *  contributor license agreements.  See the NOTICE file distributed with
 *  this work for additional information regarding copyright ownership.
 *  The ASF licenses this file to You under the Apache License, Version 2.0
 *  (the "License"); you may not use this file except in compliance with
 *  the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */


var request = require('request');
var fs = require('fs');
var events = require('events');
var prompt = require('prompt');
var unzip = require('unzip');
var constants = require('../dependencies/Constants');

var DownloadUncompressAndCopy = module.exports = Object.create(events.EventEmitter.prototype);

DownloadUncompressAndCopy.downloadFile = function(item)
{
    console.log('Downloading: ' + item.url + item.remoteFileName);
    request
        .get(item.url + item.remoteFileName)
        .pipe(fs.createWriteStream(constants.DOWNLOADS_FOLDER + item.remoteFileName)
            .on('finish', function(){
                console.log('Finished downloading: ' + item.url + item.remoteFileName);
                if(item.unzip)
                {//Unzip
                    console.log('Uncompressing:  ' + constants.DOWNLOADS_FOLDER + item.remoteFileName);
                    fs.createReadStream(constants.DOWNLOADS_FOLDER + item.remoteFileName)
                        .pipe(unzip.Extract({ path: item.destinationPath + item.destinationFileName})
                            .on('finish', function(){
                                console.log('Finished uncompressing: ' + constants.DOWNLOADS_FOLDER + item.remoteFileName + ' to: ' + item.destinationPath + item.destinationFileName);
                                if(item.pathOfFileToBeCopiedTo != undefined)
                                {
                                    fs.createReadStream(item.pathOfFileToBeCopiedFrom)
                                        .pipe(fs.createWriteStream(item.pathOfFileToBeCopiedTo)
                                        .on('finish',function(){
                                        DownloadUncompressAndCopy.emit('downloadComplete');
                                    }));
                                }
                            })
                    );
                }
                else
                {//Just copy
                    fs.createReadStream(constants.DOWNLOADS_FOLDER + item.remoteFileName)
                        .pipe(fs.createWriteStream(item.destinationPath + item.destinationFileName)
                        .on('finish',function() {
                                DownloadUncompressAndCopy.emit('downloadComplete');
                            }));
                }
            })
    );
};

DownloadUncompressAndCopy.install = function(item)
{
    DownloadUncompressAndCopy.downloadFile(item);
};