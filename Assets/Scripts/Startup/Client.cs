using System.Collections;
using UnityEngine;

public class Client : Singleton<Client>
{
    public static UnityEvent OnScriptEnable { get => instance.onEnable; }
    public static UnityEvent OnScriptDisable { get => instance.onDisable; }
    public static UnityEvent OnConnect { get => instance.onConnect; }
    public static UnityEvent OnDisconnect { get => instance.onDisconnect; }

    public string server = "localhost";
    public int port = 10234;
    public UnityEvent onEnable;
    public UnityEvent onDisable;
    public UnityEvent onConnect;
    public UnityEvent onDisconnect;
    public Coroutine coroutine;

    protected override void Awake()
    {
        base.Awake();
        DontDestroyOnLoad(gameObject);
    }

    private void OnEnable()
    {
        onEnable.Invoke();
        coroutine = StartCoroutine(Connect());
    }

    private IEnumerator Connect()
    {
        yield return new WaitForSeconds(3);
        onConnect.Invoke();
    }

    private IEnumerator Disconnect()
    {
        yield return new WaitForSeconds(3);
        onDisconnect.Invoke();
    }

    private void OnDisable()
    {
        StopCoroutine(coroutine);
        coroutine = null;
        onDisable.Invoke();
    }
}
