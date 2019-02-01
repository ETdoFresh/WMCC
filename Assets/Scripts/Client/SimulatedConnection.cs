using System;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.Text;
using UnityEngine;

public class SimulatedConnection : Connection
{
    private Uri url;
    Queue<byte[]> m_Messages = new Queue<byte[]>();

    public SimulatedConnection() { }

    public override IEnumerator Connect()
    {
        yield return new WaitForSeconds(3);
        m_Messages.Enqueue(Encoding.UTF8.GetBytes("Display Message of the day (MOTD)!"));
    }

    public override void Send(byte[] buffer)
    {
        var message = Encoding.UTF8.GetString(buffer);
        if (message == "WMCC^ETdoFresh|GetServerVersion<Client Quit>")
            m_Messages.Enqueue(Encoding.UTF8.GetBytes("1.0.0.63, build: 1255<EOL>1255<EOL>smb://192.168.254.194/Users/Public/Recorded TV<EOL>14:FE:B5:B9:41:4E<EOL><EOF>"));
    }

    public override byte[] Recv()
    {
        if (m_Messages.Count == 0)
            return null;
        return m_Messages.Dequeue();
    }

    public override void Close() { }
    public override string Error { get => null; }
}