using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Hsnz.Marquee.RNHsnzMarquee
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNHsnzMarqueeModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNHsnzMarqueeModule"/>.
        /// </summary>
        internal RNHsnzMarqueeModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNHsnzMarquee";
            }
        }
    }
}
