using System.Collections;
using System.Text;

public abstract class Connection
{
    public abstract IEnumerator Connect();
    public abstract void Send(byte[] buffer);
    public abstract byte[] Recv();
    public abstract void Close();
    public abstract string Error { get; }

    public void SendString(string str)
    {
        Send(Encoding.UTF8.GetBytes(str));
    }

    public string RecvString()
    {
        byte[] retval = Recv();
        if (retval == null)
            return null;
        return Encoding.UTF8.GetString(retval);
    }
}