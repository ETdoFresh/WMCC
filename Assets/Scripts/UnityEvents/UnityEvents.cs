﻿using System;
using UnityEngine;
using UnityEngine.Events;

[Serializable] public class UnityEvent : UnityEngine.Events.UnityEvent { }
[Serializable] public class UnityEventObject : UnityEvent<UnityEngine.Object> { }
[Serializable] public class UnityEventGameObject : UnityEvent<GameObject> { }
[Serializable] public class UnityEventTransform : UnityEvent<Transform> { }
[Serializable] public class UnityEventString : UnityEvent<string> { }

public static class UnityEventExtensions
{
    public static void AddEditorListener(this UnityEvent unityEvent, UnityAction call)
    {
#if UNITY_EDITOR
        UnityEditor.Events.UnityEventTools.AddPersistentListener(unityEvent, call);
#else
        unityEvent.AddListener(call);
#endif
    }

    public static void RemoveEditorListener(this UnityEvent unityEvent, UnityAction call)
    {
#if UNITY_EDITOR
        UnityEditor.Events.UnityEventTools.RemovePersistentListener(unityEvent, call);
#else
        unityEvent.RemoveListener(call);
#endif
    }

    public static void AddEditorListener<T0>(this UnityEvent<T0> unityEvent, UnityAction<T0> call)
    {
#if UNITY_EDITOR
        UnityEditor.Events.UnityEventTools.AddPersistentListener(unityEvent, call);
#else
        unityEvent.AddListener(call);
#endif
    }

    public static void RemoveEditorListener<T0>(this UnityEvent<T0> unityEvent, UnityAction<T0> call)
    {
#if UNITY_EDITOR
        UnityEditor.Events.UnityEventTools.RemovePersistentListener(unityEvent, call);
#else
        unityEvent.RemoveListener(call);
#endif
    }

    public static void AddEditorListener<T0, T1>(this UnityEvent<T0, T1> unityEvent, UnityAction<T0, T1> call)
    {
#if UNITY_EDITOR
        UnityEditor.Events.UnityEventTools.AddPersistentListener(unityEvent, call);
#else
        unityEvent.AddListener(call);
#endif
    }

    public static void RemoveEditorListener<T0, T1>(this UnityEvent<T0, T1> unityEvent, UnityAction<T0, T1> call)
    {
#if UNITY_EDITOR
        UnityEditor.Events.UnityEventTools.RemovePersistentListener(unityEvent, call);
#else
        unityEvent.RemoveListener(call);
#endif
    }

    public static void AddEditorListener<T0, T1, T2>(this UnityEvent<T0, T1, T2> unityEvent, UnityAction<T0, T1, T2> call)
    {
#if UNITY_EDITOR
        UnityEditor.Events.UnityEventTools.AddPersistentListener(unityEvent, call);
#else
        unityEvent.AddListener(call);
#endif
    }

    public static void RemoveEditorListener<T0, T1, T2>(this UnityEvent<T0, T1, T2> unityEvent, UnityAction<T0, T1, T2> call)
    {
#if UNITY_EDITOR
        UnityEditor.Events.UnityEventTools.RemovePersistentListener(unityEvent, call);
#else
        unityEvent.RemoveListener(call);
#endif
    }

    public static void AddEditorListener<T0, T1, T2, T3>(this UnityEvent<T0, T1, T2, T3> unityEvent, UnityAction<T0, T1, T2, T3> call)
    {
#if UNITY_EDITOR
        UnityEditor.Events.UnityEventTools.AddPersistentListener(unityEvent, call);
#else
        unityEvent.AddListener(call);
#endif
    }

    public static void RemoveEditorListener<T0, T1, T2, T3>(this UnityEvent<T0, T1, T2, T3> unityEvent, UnityAction<T0, T1, T2, T3> call)
    {
#if UNITY_EDITOR
        UnityEditor.Events.UnityEventTools.RemovePersistentListener(unityEvent, call);
#else
        unityEvent.RemoveListener(call);
#endif
    }
}