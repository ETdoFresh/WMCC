using UnityEngine;

public class Singleton<T> : MonoBehaviour where T : Singleton<T>
{
    public static T instance;

    protected virtual void Awake()
    {
        if (instance)
        {
            Destroy(gameObject);
            return;
        }
        instance = this as T;
    }

    private void OnDestroy()
    {
        if (instance == this)
            instance = null;
    }
}
