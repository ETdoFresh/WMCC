using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WMCC
{
    public class Channel
    {
        public string id = "";
        public string someBool = "";
        public string mainChannel = "";
        public string description = "";
        public string someBool2 = "";
        public string mystery = "";
        public string someBool3 = "";
        public string fullChannel = "";
        public string station = "";
        public string url = "";

        public Channel(string channelInformation)
        {
            var lines = Parse(channelInformation);
            id = lines.ElementAt(0);
            someBool = lines.ElementAt(1);
            mainChannel = lines.ElementAt(2);
            description = lines.ElementAt(3);
            someBool2 = lines.ElementAt(4);
            mystery = lines.ElementAt(5);
            someBool3 = lines.ElementAt(6);
            fullChannel = lines.ElementAt(7);
            station = lines.ElementAt(8);
            url = lines.ElementAt(9);
        }

        private IEnumerable<string> Parse(string channelInformation)
        {
            return channelInformation.Split('|');
        }
    }
}