using System;
using UnityEngine;

public class SkipBack : VideoButton
{
    [SerializeField] private double skipAmount = 10;

    protected override void OnPress()
    {
        if (!videoPlayer)
            return;

        if (!videoPlayer.canSetTime)
            return;

        videoPlayer.time = Math.Max(0, videoPlayer.time - skipAmount);
    }
}