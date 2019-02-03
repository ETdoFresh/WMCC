using UnityEngine;

public class SingletonSO<T> : ScriptableObject, ISingletonSO where T : SingletonSO<T>
{
    public static T instance;

    public virtual void Initialize()
    {
        if (instance) { return; }
        instance = this as T;
    }

    public virtual void Update() { }

    private void OnDestroy()
    {
        if (instance == this)
            instance = null;
    }
}

public interface ISingletonSO { void Initialize(); void Update(); }