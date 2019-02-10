using System;
using UnityEngine;

public class SkipForward : VideoButton
{
    [SerializeField] private double skipAmount = 30;

    protected override void OnPress()
    {
        if (!videoPlayer)
            return;

        if (!videoPlayer.canSetTime)
            return;

        videoPlayer.time = Math.Min(videoPlayer.length, videoPlayer.time + skipAmount);
    }
}