using System;
using System.Net;
using System.Net.Sockets;

namespace WMCC
{
    public class Class1
    {
        public string getServerVersionCommand = "";
        public string getChannelsCommand = "";
        public string getEntriesCommand = "";

        public string version = "";
        public string build = "";
        public string tvDirectory = "";
        public string macAddress = "";
        public Channel[] channels;
        public Show[] shows;

        public Class1()
        {
            IPAddress loginIP = IPAddress.Parse("192.168.254.194");
            var port = 9080;
            Socket socket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
            socket.Connect(loginIP, port);
            if (socket.Connected)
            {
                getServerVersionCommand = "WMCC^EREFRESH|GetServerVersion<Client Quit>";
                socket.Send(System.Text.Encoding.ASCII.GetBytes(getServerVersionCommand));
                byte[] buffer = new byte[1024];
                socket.Receive(buffer);
                var output = System.Text.Encoding.ASCII.GetString(buffer);
                var lines = output.Split(new[] { "<EOL>" }, StringSplitOptions.None);
                version = lines[0];
                build = lines[1];
                tvDirectory = lines[2];
                macAddress = lines[3];

                socket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
                socket.Connect(loginIP, port);
                getChannelsCommand = "Plex^@EREFRESH@|GetChannels<Client Quit>";
                socket.Send(System.Text.Encoding.ASCII.GetBytes(getChannelsCommand));
                buffer = new byte[1024 * 10];
                socket.Receive(buffer);
                output = System.Text.Encoding.ASCII.GetString(buffer);
                output = output.Substring(0, output.IndexOf("<EOF>"));
                lines = output.Split(new[] { "<EOL>" }, StringSplitOptions.RemoveEmptyEntries);
                channels = new Channel[lines.Length];
                for (int i = 0; i < lines.Length; i++)
                    channels[i] = new Channel(lines[i]);

                socket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
                socket.Connect(loginIP, port);
                var now = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
                var tomorrow = DateTimeOffset.UtcNow.AddDays(1).ToUnixTimeSeconds();
                getEntriesCommand = $"WMCC^@EREFRESH@|GetEntries|30450|{now}|{tomorrow}<Client Quit>";
                socket.Send(System.Text.Encoding.ASCII.GetBytes(getEntriesCommand));
                buffer = new byte[1024 * 64];
                socket.Receive(buffer);
                output = System.Text.Encoding.ASCII.GetString(buffer);
                output = output.Substring(0, output.IndexOf("<EOF>"));
                lines = output.Split(new[] { "<EOL>" }, StringSplitOptions.RemoveEmptyEntries);
                shows = new Show[lines.Length];
                for (int i = 0; i < lines.Length; i++)
                    shows[i] = new Show(lines[i]);
            }
        }
    }
}