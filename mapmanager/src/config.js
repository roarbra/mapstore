/*
 *  Copyright (C) 2007 - 2012 GeoSolutions S.A.S.
 *  http://www.geo-solutions.it
 *
 *  GPLv3 + Classpath exception
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

 /** 
 * file: config.js
 * 
 * var: config
 * object for configuring the component.
 *
 * {string} url MapComposer
 * mcUrl
 * 
 * {string} url /geostore/rest/extjs/search/
 * geoSearchUrl
 * 
 * {string} /geostore/rest/resources/resource/
 * geoDelUrl
 * 
 * {string} geostore/rest/users/user/details/
 * userUrl
 * 
 * {number} start param for the first page load
 * start
 * 
 * {number} limit param for the first page load
 * limit
 * 
 * {number} msmTimeout param for set ajax request timeout
 * msmTimeout
 * 
 */
var config = {
    mcUrl: 'http://192.168.1.160:8080/mapcomposer/',
    
    userUrl: 'http://192.168.1.160:8080/geostore/rest/users/user/details/',
    
    geoSearchUrl: 'http://192.168.1.160:8080/geostore/rest/extjs/search/',

    geoDelUrl: 'http://192.168.1.160:8080/geostore/rest/resources/resource/',

	geoBaseUrl: 'http://192.168.1.160:8080/geostore/rest/resources',
	
	geoBaseUsersUrl: 'http://192.168.1.160:8080/geostore/rest/users',
	geoBaseMapsUrl:'http://192.168.1.160:8080/geostore/rest/resources',
	
	// AppId for Google Shortener
	googleApi:'AIzaSyBq0kfiDGoIyDJpS0Yf8kj8QQmLh7YwjY8',
    
    start: 0,
    
    limit: 10,
    
    msmTimeout: 30000
};


