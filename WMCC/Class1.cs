using System;
using System.Net;
using System.Net.Sockets;

namespace WMCC
{
    public class Class1
    {
        public string version = "";
        public string build = "";
        public string tvDirectory = "";
        public string macAddress = "";
        public Channel[] channels;

        public Class1()
        {
            IPAddress loginIP = IPAddress.Parse("192.168.254.194");
            var port = 9080;
            Socket socket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
            socket.Connect(loginIP, port);
            if (socket.Connected)
            {
                socket.Send(System.Text.Encoding.ASCII.GetBytes("WMCC^EREFRESH|GetServerVersion<Client Quit>"));
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
                socket.Send(System.Text.Encoding.ASCII.GetBytes("Plex^@EREFRESH@|GetChannels<Client Quit>"));
                buffer = new byte[1024 * 10];
                socket.Receive(buffer);
                output = System.Text.Encoding.ASCII.GetString(buffer);
                output = output.Substring(0, output.IndexOf("<EOF>"));
                lines = output.Split(new[] { "<EOL>" }, StringSplitOptions.RemoveEmptyEntries);
                channels = new Channel[lines.Length];
                for (int i = 0; i < lines.Length; i++)
                    channels[i] = new Channel(lines[i]);
            }
        }
    }
}