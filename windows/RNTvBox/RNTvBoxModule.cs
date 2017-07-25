using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Com.Reactlibrary.RNTvBox
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNTvBoxModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNTvBoxModule"/>.
        /// </summary>
        internal RNTvBoxModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNTvBox";
            }
        }
    }
}
