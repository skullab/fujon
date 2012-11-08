/**
 *              THE FUJON JAVASCRIPT FRAMEWORK !
 *                  Copyright(c)2005-2012  
 *  Released under Apache License Version 2.0, January 2004
 *  (see the license here : http://www.apache.org/licenses/LICENSE-2.0.txt)
 *    
 *  Author : ivan[dot]maruca[at]gmail[dot]com <http://fujon.blogspot.com>
 *   
 **/ 
  
/**-------------------------------------------
 *            ERROR REPORT LIBRARY 
 *------------------------------------------**/
var ERROR = {
    CORE:{
        IllegalTypeAssignment: new Error('CORE : IllegalTypeAssignment',fujon.filename),
        IllegalInterfaceMethod : new Error('CORE.INTERFACE : You must override all and only methods of Interface',fujon.filename)
    },
    LIBRARY:{
        package: new Error('LIBRARY : Try to import undefined package',fujon.filename),
        toStringNotOverride: new Error('LIBRARY : Error with package ! You must override toString() function into your own package',fujon.filename)
    },
    RUNNABLE:{
        unset:new Error('RUNNABLE : Function parsed unset',fujon.filename),
        resume:new Error('RUNNABLE : Impossible to resume runner',fujon.filename)
    },
    THREAD:{
        notRunnable:new Error('THREAD : Non-Runnable Thread',fujon.filename),
        IllegalThreadStateException:new Error('THREAD : IllegalThreadStateException',fujon.filename)
    },
    GENERATOR:{
        StopIteration:new Error('GENERATOR : StopIteration',fujon.filename),
        _throw:new Error('GENERATOR : Throw an undefined error',fujon.filename)
    },
    GEOTOOLS:{
        GEOLOCATION:{
            noSupport: new Error('GEOLOCATION: Geolocation is not supported for this browser',fujon.filename),
            callbackUnset: new Error('GEOLOCATION: Request position without callback function',fujon.filename)
        },
        EASYMAPS:{
            createWithInvalidOption: new Error('GEOTOOLS.EASYMAPS : Try to create a map without valid arguments',fujon.filename)
        }
    }
}


