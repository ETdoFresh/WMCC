using System;
using UnityEngine;

[CreateAssetMenu(menuName = "Scriptable Objects/Volume")]
public class Volume : SingletonSO<Volume>
{
    public static float Value { get => Instance.value; set => Instance.value = value; }
    private static int Step { get => Instance.step; set => Instance.step = value; }
    private static int MaxStep { get => Instance.maxStep; set => Instance.maxStep = value; }

    public float value = 1;
    public int maxStep = 10;
    public int step = 10;

    public override void Initialize()
    {
        base.Initialize();
        Value = (float)Step / MaxStep;
        AudioListener.volume = Value;
    }

    public static void Down()
    {
        Step = Math.Max(0, Step - 1);
        Value = (float)Step / MaxStep;
    }

    public static void Up()
    {
        Step = Math.Min(MaxStep, Step + 1);
        Value = (float)Step / MaxStep;
    }
}