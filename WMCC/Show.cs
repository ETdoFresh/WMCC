using System.Collections.Generic;
using System.Linq;

namespace WMCC
{
    public class Show
    {
        public string id = "";
        public string title = "";
        public string mainChannel = "";
        public string startTime = "";
        public string endTime = "";
        public string description = "";
        public string description2 = "";
        public string value07 = "";
        public string value08 = "";
        public string value09 = "";
        public string value10 = "";
        public string value11 = "";
        public string value12 = "";
        public string value13 = "";
        public string url = "";
        public string episode = "";
        public string channelId = "";
        public string audio = "";
        public string categories = "";
        public string value19 = "";
        public string cast = "";
        public string director = "";
        public string value22 = "";
        public string value23 = "";
        public string value24 = "";
        public string value25 = "";

        public Show(string channelInformation)
        {
            var lines = Parse(channelInformation);
            id = lines.ElementAt(0);
            title = lines.ElementAt(1);
            mainChannel = lines.ElementAt(2);
            startTime = lines.ElementAt(3);
            endTime = lines.ElementAt(4);
            description = lines.ElementAt(5);
            description2 = lines.ElementAt(6);
            value07 = lines.ElementAt(7);
            value08 = lines.ElementAt(8);
            value09 = lines.ElementAt(9);
            value10 = lines.ElementAt(10);
            value11 = lines.ElementAt(11);
            value12 = lines.ElementAt(12);
            value13 = lines.ElementAt(13);
            url = lines.ElementAt(14);
            episode = lines.ElementAt(15);
            channelId = lines.ElementAt(16);
            audio = lines.ElementAt(17);
            categories = lines.ElementAt(18);
            value19 = lines.ElementAt(19);
            cast = lines.ElementAt(20);
            director = lines.ElementAt(21);
            value22 = lines.ElementAt(22);
            value23 = lines.ElementAt(23);
            value24 = lines.ElementAt(24);
            value25 = lines.ElementAt(25);
        }

        private IEnumerable<string> Parse(string showInformation)
        {
            return showInformation.Split('|');
        }
    }
}