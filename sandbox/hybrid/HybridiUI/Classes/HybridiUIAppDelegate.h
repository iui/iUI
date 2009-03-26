//
//  HybridiUIAppDelegate.h
//  HybridiUI
//
//  Created by Sean Gilligan on 3/26/09.
//  Copyright __MyCompanyName__ 2009. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface HybridiUIAppDelegate : NSObject <UIApplicationDelegate> {
    UIWindow *window;
	IBOutlet UIWebView *webView;
}

@property (nonatomic, retain) IBOutlet UIWindow *window;

@end

