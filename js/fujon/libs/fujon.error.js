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
        IllegalTypeAssignment: new Error('CORE : IllegalTypeAssignment'),
        IllegalInterfaceMethod : new Error('CORE.INTERFACE : You must override all and only methods of Interface'),
        InterfaceError: new Error('CORE.INTERFACE : Bad Interface implementation'),
        NoSuchMethodException: new Error('CORE.CLASS : Could not find method "%s"'),
        BadAbstractMethod: new Error('CORE.CLASS : You must override the abstract method "%s"')
    },
    LIBRARY:{
        package: new Error('LIBRARY : Try to import undefined package'),
        toStringNotOverride: new Error('LIBRARY : Error with package ! You must override toString() function into your own package')
    },
    RUNNABLE:{
        unset:new Error('RUNNABLE : Function parsed unset'),
        resume:new Error('RUNNABLE : Impossible to resume runner')
    },
    THREAD:{
        notRunnable:new Error('THREAD : Non-Runnable Thread'),
        IllegalThreadStateException:new Error('THREAD : IllegalThreadStateException')
    },
    GENERATOR:{
        StopIteration:new Error('GENERATOR : StopIteration'),
        _throw:new Error('GENERATOR : Throw an undefined error')
    },
    GEOTOOLS:{
        GEOLOCATION:{
            noSupport: new Error('GEOLOCATION: Geolocation is not supported for this browser'),
            callbackUnset: new Error('GEOLOCATION: Request position without callback function')
        },
        EASYMAPS:{
            createWithInvalidOption: new Error('GEOTOOLS.EASYMAPS : Try to create a map without valid arguments')
        }
    }
}


