using UnityEngine;

public class VolumeUp: VideoButton
{
    protected override void OnPress()
    {
        Volume.Up();
        AudioListener.volume = Volume.Value;
    }
}